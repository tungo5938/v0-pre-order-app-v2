import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ShopifyHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">Essential Preorder</h1>
        </div>
      
      </div>
    </header>
  )
}
