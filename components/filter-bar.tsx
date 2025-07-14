"use client"

import { Button } from "@/components/ui/button"
import type { FilterCategory } from "@/types/news"

interface FilterBarProps {
  activeFilter: FilterCategory
  onFilterChange: (filter: FilterCategory) => void
}

const filters: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Bitcoin", value: "bitcoin" },
  { label: "DeFi", value: "defi" },
  { label: "Macro", value: "macro" },
  { label: "Altcoins", value: "altcoins" },
]

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 rounded-lg bg-secondary p-1 shadow-inner border border-border">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(filter.value)}
            className={`
              transition-all duration-200 flex-1 text-sm font-medium h-9
              ${
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }
            `}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
