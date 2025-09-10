import { ShopifyHeader } from "@/components/shopify-header"
import { PreorderCampaignsCard } from "@/components/preorder-campaigns-card"
import { GeneralSettingsCard } from "@/components/general-settings-card"
import { NotificationsCard } from "@/components/notifications-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PreorderSettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ShopifyHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground text-balance">Preorder settings</h1>
          <Link href="/campaigns/create">
            <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-4 py-2 text-sm">
              Create campaign
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <PreorderCampaignsCard />
          <GeneralSettingsCard />
          <NotificationsCard />
        </div>
      </main>
    </div>
  )
}
