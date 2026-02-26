import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockHomeContent } from '../../data/adminMockData';
import { ArrowLeft, Plus, Edit, Trash2, ChevronUp, ChevronDown, Image } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useContent } from '../../context/ContentContext';
import Modal from '../../components/common/Modal';

const EMPTY_SLIDE = { title: '', text: '', image: '', link: '', ctaText: '' };

const ContentCarousel = () => {
  const { carousel: contextCarousel, setCarousel: setContextCarousel } = useContent();
  const [slides, setSlides] = useState([...contextCarousel]);
  const [editingSlide, setEditingSlide] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const { success } = useToast();
  const navigate = useNavigate();

  /* ── Réordonnancement ── */
  const moveSlide = (id, direction) => {
    setSlides(prev => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex(s => s.id === id);
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= sorted.length) return prev;
      const updated = sorted.map((s, i) => {
        if (i === idx)     return { ...s, order: sorted[swapIdx].order };
        if (i === swapIdx) return { ...s, order: sorted[idx].order };
        return s;
      });
      return updated.sort((a, b) => a.order - b.order);
    });
  };

  /* ── Édition ── */
  const openEdit = (slide) => { setEditingSlide({ ...slide }); setIsNew(false); };
  const openAdd  = () => { setEditingSlide({ ...EMPTY_SLIDE, id: Date.now() }); setIsNew(true); };

  const handleSaveSlide = () => {
    if (!editingSlide.title.trim()) return;
    if (isNew) {
      const newOrder = slides.length > 0 ? Math.max(...slides.map(s => s.order)) + 1 : 1;
      setSlides(prev => [...prev, { ...editingSlide, order: newOrder }]);
      success('Slide ajoutée avec succès !');
    } else {
      setSlides(prev => prev.map(s => s.id === editingSlide.id ? { ...editingSlide } : s));
      success('Slide modifiée avec succès !');
    }
    setEditingSlide(null);
  };

  /* ── Suppression ── */
  const handleDeleteSlide = () => {
    setSlides(prev => {
      const filtered = prev.filter(s => s.id !== confirmDeleteId);
      return filtered.map((s, i) => ({ ...s, order: i + 1 }));
    });
    success('Slide supprimée.');
    setConfirmDeleteId(null);
  };

  const sorted = [...slides].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/content"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Carrousel Page d'Accueil</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{sorted.length} slide(s)</p>
          </div>
        </div>
        <div className="flex gap-2 sm:flex-shrink-0">
          <button
            onClick={openAdd}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 min-h-[44px] px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Ajouter une slide
          </button>
          <button
            onClick={() => { setContextCarousel([...slides].sort((a, b) => a.order - b.order)); success('Carrousel enregistré !'); navigate('/admin/content'); }}
            className="flex-1 sm:flex-none flex items-center justify-center min-h-[44px] px-4 border border-input bg-background rounded-lg hover:bg-accent transition-colors text-sm font-medium"
          >
            Enregistrer
          </button>
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {sorted.map((slide, idx) => (
          <div key={slide.id} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">

            {/* Corps */}
            <div className="flex gap-3 p-3 sm:p-4">
              {/* Vignette */}
              <div className="w-14 h-10 sm:w-20 sm:h-14 flex-shrink-0 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                {slide.image ? (
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                ) : (
                  <Image className="h-4 w-4 text-muted-foreground" />
                )}
              </div>

              {/* Contenu */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate text-sm leading-snug">
                  {slide.title || <span className="italic text-muted-foreground">Sans titre</span>}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                  {slide.text}
                </p>
                <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mt-1.5">
                  Position {slide.order}
                </span>
              </div>

              {/* Flèches d'ordre — desktop uniquement */}
              <div className="hidden sm:flex flex-col gap-1 flex-shrink-0">
                <button
                  onClick={() => moveSlide(slide.id, 'up')}
                  disabled={idx === 0}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-muted transition-colors disabled:opacity-30"
                  aria-label="Monter"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <button
                  onClick={() => moveSlide(slide.id, 'down')}
                  disabled={idx === sorted.length - 1}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-muted transition-colors disabled:opacity-30"
                  aria-label="Descendre"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Barre d'actions */}
            <div className="border-t border-border flex divide-x divide-border">
              {/* Flèches ↑↓ — mobile uniquement */}
              <div className="sm:hidden flex divide-x divide-border">
                <button
                  onClick={() => moveSlide(slide.id, 'up')}
                  disabled={idx === 0}
                  className="min-h-[44px] w-11 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30"
                  aria-label="Monter"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveSlide(slide.id, 'down')}
                  disabled={idx === sorted.length - 1}
                  className="min-h-[44px] w-11 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors disabled:opacity-30"
                  aria-label="Descendre"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => openEdit(slide)}
                className="flex-1 flex items-center justify-center gap-1.5 min-h-[44px] text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Modifier
              </button>
              <button
                onClick={() => setConfirmDeleteId(slide.id)}
                className="flex-1 flex items-center justify-center gap-1.5 min-h-[44px] text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </button>
            </div>
          </div>
        ))}

        {sorted.length === 0 && (
          <div className="bg-white border border-border rounded-lg p-10 text-center">
            <Image className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">Aucune slide</p>
            <p className="text-sm text-muted-foreground mt-1">
              Ajoutez une première slide pour alimenter le carrousel.
            </p>
            <button
              onClick={openAdd}
              className="mt-4 inline-flex items-center gap-2 px-4 min-h-[44px] bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Ajouter une slide
            </button>
          </div>
        )}
      </div>

      {/* ── Modale édition / ajout ── */}
      <Modal
        isOpen={!!editingSlide}
        onClose={() => setEditingSlide(null)}
        title={isNew ? 'Ajouter une slide' : 'Modifier la slide'}
        showCloseButton={false}
        size="lg"
      >
        {editingSlide && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Titre <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={editingSlide.title}
                onChange={e => setEditingSlide(p => ({ ...p, title: e.target.value }))}
                placeholder="Ex : Protégez votre entreprise"
                className="w-full px-4 py-2.5 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
              <textarea
                value={editingSlide.text}
                onChange={e => setEditingSlide(p => ({ ...p, text: e.target.value }))}
                placeholder="Sous-titre ou accroche..."
                rows={3}
                className="w-full px-4 py-2.5 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">URL de l'image</label>
              <input
                type="text"
                value={editingSlide.image}
                onChange={e => setEditingSlide(p => ({ ...p, image: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-2.5 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
              {editingSlide.image && (
                <img
                  src={editingSlide.image}
                  alt="Aperçu"
                  className="mt-2 h-24 w-full object-cover rounded-lg border border-border"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Texte du bouton</label>
                <input
                  type="text"
                  value={editingSlide.ctaText}
                  onChange={e => setEditingSlide(p => ({ ...p, ctaText: e.target.value }))}
                  placeholder="Ex : Découvrir nos solutions"
                  className="w-full px-4 py-2.5 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Lien</label>
                <input
                  type="text"
                  value={editingSlide.link}
                  onChange={e => setEditingSlide(p => ({ ...p, link: e.target.value }))}
                  placeholder="Ex : /catalogue"
                  className="w-full px-4 py-2.5 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-1">
              <button
                onClick={() => setEditingSlide(null)}
                className="min-h-[44px] w-full sm:w-auto px-5 border border-input rounded-lg text-base hover:bg-muted transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveSlide}
                disabled={!editingSlide.title.trim()}
                className="min-h-[44px] w-full sm:w-auto px-5 bg-primary text-primary-foreground rounded-lg text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isNew ? 'Ajouter' : 'Enregistrer'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Modale confirmation suppression ── */}
      <Modal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Supprimer la slide"
        showCloseButton={false}
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Êtes-vous sûr de vouloir supprimer cette slide ? Cette action est irréversible.
          </p>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              onClick={() => setConfirmDeleteId(null)}
              className="min-h-[44px] w-full sm:w-auto px-5 border border-input rounded-lg text-base hover:bg-muted transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleDeleteSlide}
              className="min-h-[44px] w-full sm:w-auto px-5 bg-destructive text-destructive-foreground rounded-lg text-base hover:bg-destructive/90 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContentCarousel;
