import * as React from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export function DatePicker({ 
  date, 
  onDateChange, 
  placeholder = "Sélectionner une date",
  className,
  disabled,
  required,
  label,
  error,
  ...props 
}) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-destructive"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: fr }) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            locale={fr}
            {...props}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

// DatePicker pour date d'expiration de carte (MM/YY)
export function CardExpiryPicker({ 
  value = "", 
  onChange, 
  className,
  disabled,
  required,
  label,
  error,
}) {
  // Parser la valeur
  const parseValue = (val) => {
    if (!val) return { month: "", year: "" }
    if (val.includes("/")) {
      const parts = val.split("/")
      return { month: parts[0] || "", year: parts[1] || "" }
    }
    return { month: "", year: "" }
  }

  // Initialiser depuis la prop value uniquement au montage
  const [month, setMonth] = React.useState(() => parseValue(value).month)
  const [year, setYear] = React.useState(() => parseValue(value).year)
  const previousValueRef = React.useRef(value)

  // Synchroniser uniquement si value change depuis l'extérieur (pas de notre onChange)
  React.useEffect(() => {
    // Si value a changé mais pas à cause de notre onChange (comparaison avec la ref)
    if (value !== previousValueRef.current) {
      const parsed = parseValue(value)
      setMonth(parsed.month)
      setYear(parsed.year)
      previousValueRef.current = value
    }
  }, [value])

  const handleMonthChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2)
    setMonth(val)
    
    // Mettre à jour la valeur parent
    if (val.length === 2 && year.length === 2) {
      const newValue = `${val}/${year}`
      previousValueRef.current = newValue
      onChange(newValue)
    } else if (val.length === 0 && year.length === 0) {
      previousValueRef.current = ""
      onChange("")
    }
    // Si incomplet, on garde juste l'état local (permet de continuer à saisir)
  }

  const handleYearChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2)
    setYear(val)
    
    // Mettre à jour la valeur parent
    if (month.length === 2 && val.length === 2) {
      const newValue = `${month}/${val}`
      previousValueRef.current = newValue
      onChange(newValue)
    } else if (month.length === 0 && val.length === 0) {
      previousValueRef.current = ""
      onChange("")
    }
    // Si incomplet, on garde juste l'état local (permet de continuer à saisir)
  }

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="MM"
            value={month}
            onChange={handleMonthChange}
            maxLength={2}
            disabled={disabled}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              error ? "border-destructive" : "border-input bg-background"
            )}
          />
        </div>
        <span className="self-center text-muted-foreground">/</span>
        <div className="flex-1">
          <input
            type="text"
            placeholder="AA"
            value={year}
            onChange={handleYearChange}
            maxLength={2}
            disabled={disabled}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              error ? "border-destructive" : "border-input bg-background"
            )}
          />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
