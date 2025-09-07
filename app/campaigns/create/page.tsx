"use client"

import { useState } from "react"
import { ArrowLeft, Eye, Package, Search, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

interface Product {
  id: string
  name: string
  image: string
  inventory: number
  inventoryLimit: number
  price: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "White T-shirt",
    image: "/white-t-shirt.png",
    inventory: 25,
    inventoryLimit: 50,
    price: "₫499.00",
  },
  {
    id: "2",
    name: "Blue Jeans",
    image: "/classic-blue-jeans.png",
    inventory: 15,
    inventoryLimit: 30,
    price: "₫899.00",
  },
]

export default function CreateCampaignPage() {
  const [campaignTitle, setCampaignTitle] = useState("Preorder campaign 5 September")
  const [buttonText, setButtonText] = useState("Preorder")
  const [message, setMessage] = useState("Ships as soon as possible")
  const [selectedSize, setSelectedSize] = useState("Medium")
  const [activeTab, setActiveTab] = useState("content")

  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [addProductType, setAddProductType] = useState("specific")

  const addAllProducts = () => {
    setProducts(mockProducts)
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const removeAllProducts = () => {
    setProducts([])
  }

  const updateInventoryLimit = (id: string, limit: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, inventoryLimit: limit } : p)))
  }

  const addSpecificProducts = () => {
    // Simulate adding products from modal
    const newProducts = mockProducts.filter((p) => !products.find((existing) => existing.id === p.id))
    setProducts([...products, ...newProducts])
    setShowAddModal(false)
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-[#212B36]">Create Preorder campaign</h1>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  Not published
                </Badge>
              </div>
            </div>
            <Button className="bg-[#008060] hover:bg-[#006B4F] text-white font-medium">Publish</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className={`grid gap-6 ${activeTab === "products" ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
          {/* Left Panel - Configuration */}
          <div className="space-y-6">
            {/* Tabs */}
            <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-[#F6F6F7] data-[state=active]:text-[#212B36] text-[#454F5B]"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-[#F6F6F7] data-[state=active]:text-[#212B36] text-[#454F5B]"
                >
                  Preorder products
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6 mt-6">
                {/* Campaign Card */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-medium text-[#212B36]">Campaign</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium text-[#212B36]">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={campaignTitle}
                        onChange={(e) => setCampaignTitle(e.target.value)}
                        className="border-gray-300 focus:border-[#008060] focus:ring-[#008060]"
                      />
                      <p className="text-xs text-[#6D7175]">This is only visible for you</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Preorder Button Card */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-medium text-[#212B36]">Preorder button</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="buttonText" className="text-sm font-medium text-[#212B36]">
                        Button text
                      </Label>
                      <Input
                        id="buttonText"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        className="border-gray-300 focus:border-[#008060] focus:ring-[#008060]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-[#212B36]">
                        Message
                      </Label>
                      <Input
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-gray-300 focus:border-[#008060] focus:ring-[#008060]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="mt-6">
                {products.length === 0 ? (
                  // Empty State
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardContent className="p-12 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-[#F6F6F7] rounded-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-[#008060]" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-[#212B36]">Add products to Preorder</h3>
                          <p className="text-[#454F5B] max-w-md">
                            Products and variants that are added will be prepared for preorder after the campaign is
                            published.
                          </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddModal(true)}
                            className="border-gray-300 text-[#454F5B] hover:bg-gray-50"
                          >
                            Add specific products
                          </Button>
                          <Button onClick={addAllProducts} className="bg-[#008060] hover:bg-[#006B4F] text-white">
                            Add all products
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // Products Added State
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium text-[#212B36]">Products</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddModal(true)}
                            className="border-gray-300 text-[#454F5B] hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add more products
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={removeAllProducts}
                            className="border-gray-300 text-[#454F5B] hover:bg-gray-50 bg-transparent"
                          >
                            Remove all variants
                          </Button>
                        </div>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search a product"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 border-gray-300 focus:border-[#008060] focus:ring-[#008060]"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-[#F6F6F7] border-t border-gray-200">
                            <tr>
                              <th className="text-left py-3 px-6 text-xs font-medium text-[#454F5B] uppercase tracking-wide">
                                Product
                              </th>
                              <th className="text-left py-3 px-6 text-xs font-medium text-[#454F5B] uppercase tracking-wide">
                                Inventory
                              </th>
                              <th className="text-left py-3 px-6 text-xs font-medium text-[#454F5B] uppercase tracking-wide">
                                Inventory limit
                              </th>
                              <th className="text-left py-3 px-6 text-xs font-medium text-[#454F5B] uppercase tracking-wide">
                                Price
                              </th>
                              <th className="w-12"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                              <tr key={product.id} className="hover:bg-gray-50">
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                    />
                                    <span className="font-medium text-[#212B36]">{product.name}</span>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-[#454F5B]">{product.inventory}</td>
                                <td className="py-4 px-6">
                                  <Input
                                    type="number"
                                    value={product.inventoryLimit}
                                    onChange={(e) =>
                                      updateInventoryLimit(product.id, Number.parseInt(e.target.value) || 0)
                                    }
                                    className="w-20 border-gray-300 focus:border-[#008060] focus:ring-[#008060]"
                                  />
                                </td>
                                <td className="py-4 px-6 text-[#454F5B]">{product.price}</td>
                                <td className="py-4 px-6">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeProduct(product.id)}
                                    className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Preview */}
          {activeTab === "content" && (
            <div className="lg:sticky lg:top-6 lg:self-start">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-[#454F5B]" />
                    <CardTitle className="text-sm font-medium text-[#454F5B] uppercase tracking-wide">
                      Preview
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product Preview */}
                  <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Product Image</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-[#212B36]">White T-shirt</h3>
                      <p className="text-lg font-semibold text-[#212B36]">₫499.00</p>
                    </div>

                    {/* Size Selector */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#212B36]">Size</Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger className="border-gray-300 focus:border-[#008060] focus:ring-[#008060]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Small">Small</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Preorder Button */}
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-[#008060] hover:bg-[#006B4F] text-white font-medium py-3 text-base"
                        size="lg"
                      >
                        {buttonText}
                      </Button>
                      <p className="text-sm text-[#454F5B] text-center">{message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-[#212B36]">Add products</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup value={addProductType} onValueChange={setAddProductType} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific" className="text-[#212B36]">
                  Specific products
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="collections" id="collections" />
                <Label htmlFor="collections" className="text-[#212B36]">
                  Collections
                </Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="border-gray-300 text-[#454F5B] hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button onClick={addSpecificProducts} className="bg-[#008060] hover:bg-[#006B4F] text-white">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
