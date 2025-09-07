import { ShopifyHeader } from "@/components/shopify-header"
import { PreorderCampaignsCard } from "@/components/preorder-campaigns-card"
import { GeneralSettingsCard } from "@/components/general-settings-card"
import { NotificationsCard } from "@/components/notifications-card"

export default function PreorderSettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ShopifyHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground text-balance">Preorder settings</h1>
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
