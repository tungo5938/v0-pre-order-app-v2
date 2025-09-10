import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export function PreorderCampaignsCard() {
  return (
    <Card className="bg-card border-border shadow-sm rounded-lg">
      <CardHeader className="pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-card-foreground">Preorder campaigns</CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Create tailored preorder campaigns for your products with customizable payment, fulfillment, and inventory
            rules. Set discounts and personalize widget appearance for each campaign.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search a campaign"
              className="pl-10 bg-input border-border rounded-md h-9 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="bg-muted/50 px-4 py-3 border-b border-border">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground">
                <div>Name</div>
                <div>Status</div>
                <div>Orders</div>
              </div>
            </div>
            <div className="px-4 py-4 bg-card">
              <div className="grid grid-cols-3 gap-4 items-center text-sm">
                <div className="text-card-foreground font-medium">Preorder campaign 4 September</div>
                <div>
                  <Badge className="bg-success text-success-foreground border-success/20 font-medium px-2 py-1 text-xs">
                    Published
                  </Badge>
                </div>
                <div className="text-muted-foreground">0 orders</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
