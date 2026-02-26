import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockHomeContent } from '../../data/adminMockData';
import { ArrowLeft, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useContent } from '../../context/ContentContext';
import { Switch } from '../../components/ui/switch';

/* ── Bouton de la barre d'outils ── */
const ToolbarBtn = ({ onMouseDown, active, title, children }) => (
  <button
    type="button"
    title={title}
    onMouseDown={onMouseDown}
    className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded transition-colors ${
      active
        ? 'bg-primary/15 text-primary'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`}
  >
    {children}
  </button>
);

const ContentStaticText = () => {
  const editorRef = useRef(null);
  const [formats, setFormats] = useState({ bold: false, italic: false, underline: false });
  const [localBanner, setLocalBanner] = useState(mockHomeContent.banner);
  const navigate = useNavigate();
  const { success } = useToast();
  const { setBanner, setStaticText } = useContent();

  /* Initialise l'éditeur au montage */
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = mockHomeContent.staticText;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Rafraîchit l'état actif des boutons (gras/italique/souligné) */
  const updateFormats = useCallback(() => {
    setFormats({
      bold:      document.queryCommandState('bold'),
      italic:    document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  }, []);

  /* Exécute une commande sans retirer le focus de l'éditeur */
  const execCmd = useCallback((cmd, value = null) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
    updateFormats();
  }, [updateFormats]);

  const handleFormatBlock = (e) => {
    if (e.target.value) {
      execCmd('formatBlock', e.target.value);
      e.target.value = '';
    }
  };

  const handleSave = () => {
    setBanner(localBanner);
    setStaticText(editorRef.current?.innerHTML || '');
    success('Texte enregistré avec succès !');
    navigate('/admin/content');
  };

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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Texte Fixe Page d'Accueil</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Contenu affiché sous le carrousel</p>
          </div>
        </div>
      </div>

      {/* ── Banderole ── */}
      <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Message Banderole</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Affiché en haut de la page d'accueil</p>
          </div>
          <Switch
            checked={localBanner.enabled}
            onCheckedChange={(v) => setLocalBanner(b => ({ ...b, enabled: v }))}
            aria-label="Activer la banderole"
          />
        </div>

        {localBanner.enabled && (
          <div className="p-4 space-y-4">
            {/* Sélecteur de type */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLocalBanner(b => ({ ...b, type: 'info' }))}
                className={`flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-lg border-2 text-sm font-medium transition-colors ${
                  localBanner.type === 'info'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-border text-muted-foreground hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <Info className="h-4 w-4" />
                Info
              </button>
              <button
                type="button"
                onClick={() => setLocalBanner(b => ({ ...b, type: 'alert' }))}
                className={`flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-lg border-2 text-sm font-medium transition-colors ${
                  localBanner.type === 'alert'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-border text-muted-foreground hover:border-red-300 hover:bg-red-50/50'
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                Alerte
              </button>
            </div>

            {/* Message */}
            <input
              type="text"
              value={localBanner.message}
              onChange={(e) => setLocalBanner(b => ({ ...b, message: e.target.value }))}
              placeholder="Saisir le message de la banderole..."
              className="w-full border border-input rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />

            {/* Aperçu */}
            {localBanner.message && (
              <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium ${
                localBanner.type === 'alert'
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                {localBanner.type === 'alert'
                  ? <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  : <Info className="h-4 w-4 flex-shrink-0" />
                }
                <span>{localBanner.message}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Éditeur WYSIWYG ── */}
      <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">

        {/* Barre d'outils */}
        <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 border-b border-border bg-muted/30">

          {/* Sélecteur de format (Titre / Paragraphe) */}
          <select
            defaultValue=""
            onChange={handleFormatBlock}
            className="text-sm border border-input rounded-md px-2 py-1.5 bg-background focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="" disabled>Format</option>
            <option value="p">Paragraphe</option>
            <option value="h1">Titre 1</option>
            <option value="h2">Titre 2</option>
            <option value="h3">Titre 3</option>
          </select>

          <div className="w-px h-5 bg-border mx-1.5" />

          <ToolbarBtn
            active={formats.bold}
            title="Gras (Ctrl+B)"
            onMouseDown={(e) => { e.preventDefault(); execCmd('bold'); }}
          >
            <Bold className="h-4 w-4" />
          </ToolbarBtn>

          <ToolbarBtn
            active={formats.italic}
            title="Italique (Ctrl+I)"
            onMouseDown={(e) => { e.preventDefault(); execCmd('italic'); }}
          >
            <Italic className="h-4 w-4" />
          </ToolbarBtn>

          <ToolbarBtn
            active={formats.underline}
            title="Souligné (Ctrl+U)"
            onMouseDown={(e) => { e.preventDefault(); execCmd('underline'); }}
          >
            <Underline className="h-4 w-4" />
          </ToolbarBtn>

          <div className="w-px h-5 bg-border mx-1.5" />

          <ToolbarBtn
            title="Aligner à gauche"
            onMouseDown={(e) => { e.preventDefault(); execCmd('justifyLeft'); }}
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Centrer"
            onMouseDown={(e) => { e.preventDefault(); execCmd('justifyCenter'); }}
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarBtn>
          <ToolbarBtn
            title="Aligner à droite"
            onMouseDown={(e) => { e.preventDefault(); execCmd('justifyRight'); }}
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarBtn>
        </div>

        {/* Zone de saisie */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onKeyUp={updateFormats}
          onMouseUp={updateFormats}
          onSelect={updateFormats}
          className="min-h-[260px] p-4 sm:p-5 outline-none prose max-w-none text-foreground"
          style={{ wordBreak: 'break-word' }}
        />
      </div>

      {/* Boutons bas de page */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Link
          to="/admin/content"
          className="flex items-center justify-center min-h-[44px] px-5 border border-input rounded-lg text-base hover:bg-muted transition-colors text-center"
        >
          Annuler
        </Link>
        <button
          onClick={handleSave}
          className="flex items-center justify-center min-h-[44px] px-5 bg-primary text-primary-foreground rounded-lg text-base hover:bg-primary/90 transition-colors"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default ContentStaticText;
