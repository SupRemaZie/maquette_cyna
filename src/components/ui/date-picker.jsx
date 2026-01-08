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
  value, 
  onChange, 
  className,
  disabled,
  required,
  label,
  error,
}) {
  const [month, setMonth] = React.useState("")
  const [year, setYear] = React.useState("")

  React.useEffect(() => {
    if (value) {
      const parts = value.split("/")
      if (parts.length === 2) {
        setMonth(parts[0])
        setYear(parts[1])
      } else if (value.length === 2 && !value.includes("/")) {
        // Si seulement le mois est saisi
        setMonth(value)
        setYear("")
      } else {
        setMonth("")
        setYear("")
      }
    } else {
      setMonth("")
      setYear("")
    }
  }, [value])

  const handleMonthChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2)
    setMonth(val)
    if (val.length === 2 && year.length === 2) {
      onChange(`${val}/${year}`)
    } else if (val.length === 2) {
      onChange(val)
    } else {
      onChange("")
    }
  }

  const handleYearChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2)
    setYear(val)
    if (month.length === 2 && val.length === 2) {
      onChange(`${month}/${val}`)
    } else if (val.length === 2) {
      onChange(val)
    } else {
      onChange("")
    }
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
