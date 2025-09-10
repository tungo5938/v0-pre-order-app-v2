"use client"

import { useState } from "react"
import { ArrowLeft, Eye, Package, Search, Trash2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

interface Product {
  id: string
  name: string
  image: string
  inventory: number
  inventoryLimit: number
  price: string
}

const allProducts: Product[] = [
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
  {
    id: "3",
    name: "Gift Card",
    image: "/gift-card-assortment.png",
    inventory: 0,
    inventoryLimit: 100,
    price: "₫10.00",
  },
  {
    id: "4",
    name: "Green Snowboard",
    image: "/green-snowboard.jpg",
    inventory: 0,
    inventoryLimit: 25,
    price: "₫100.00",
  },
  {
    id: "5",
    name: "Red Snowboard",
    image: "/red-snowboard.jpg",
    inventory: 0,
    inventoryLimit: 25,
    price: "₫100.00",
  },
]

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

  const [showProductSelectionModal, setShowProductSelectionModal] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [productSearchQuery, setProductSearchQuery] = useState("")

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

  const handleContinue = () => {
    setShowAddModal(false)
    setShowProductSelectionModal(true)
    setSelectedProducts([])
  }

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleAddSelectedProducts = () => {
    const productsToAdd = allProducts.filter((p) => selectedProducts.includes(p.id))
    const newProducts = productsToAdd.filter((p) => !products.find((existing) => existing.id === p.id))
    setProducts([...products, ...newProducts])
    setShowProductSelectionModal(false)
    setSelectedProducts([])
    setProductSearchQuery("")
  }

  const handleCancelProductSelection = () => {
    setShowProductSelectionModal(false)
    setSelectedProducts([])
    setProductSearchQuery("")
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredAllProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(productSearchQuery.toLowerCase()),
  )

  const getModalTitle = () => {
    return addProductType === "specific" ? "Add products" : "Collections"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-medium text-foreground">Create Preorder campaign</h1>
                <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted">
                  Not published
                </Badge>
              </div>
            </div>
            <Button className="polaris-button-primary">Publish</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Left Panel - Configuration */}
          <div className={`space-y-6 ${activeTab === "products" ? "lg:col-span-2" : "lg:col-span-1"}`}>
            {/* Tabs */}
            <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card border border-border max-w-md">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
                >
                  Preorder products
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6 mt-6">
                {/* Campaign Card */}
                <Card className="bg-card border border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-medium text-foreground">Campaign</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium text-foreground">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={campaignTitle}
                        onChange={(e) => setCampaignTitle(e.target.value)}
                        className="border-border focus:border-ring focus:ring-ring"
                      />
                      <p className="text-xs text-muted-foreground">This is only visible for you</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Preorder Button Card */}
                <Card className="bg-card border border-border shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-medium text-foreground">Preorder button</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="buttonText" className="text-sm font-medium text-foreground">
                        Button text
                      </Label>
                      <Input
                        id="buttonText"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        className="border-border focus:border-ring focus:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </Label>
                      <Input
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-border focus:border-ring focus:ring-ring"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="mt-6">
                {products.length === 0 ? (
                  // Empty State
                  <Card className="bg-card border border-border shadow-sm">
                    <CardContent className="p-12 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-foreground">Add products to Preorder</h3>
                          <p className="text-muted-foreground max-w-md">
                            Products and variants that are added will be prepared for preorder after the campaign is
                            published.
                          </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddModal(true)}
                            className="polaris-button-secondary"
                          >
                            Add specific products
                          </Button>
                          <Button onClick={addAllProducts} className="polaris-button-primary">
                            Add all products
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // Products Added State
                  <Card className="bg-card border border-border shadow-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium text-foreground">Products</CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddModal(true)}
                            className="polaris-button-secondary"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add more products
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={removeAllProducts}
                            className="polaris-button-secondary bg-transparent"
                          >
                            Remove all variants
                          </Button>
                        </div>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search a product"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 border-border focus:border-ring focus:ring-ring"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-background border-t border-border">
                            <tr>
                              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Product
                              </th>
                              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Inventory
                              </th>
                              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Inventory limit
                              </th>
                              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Price
                              </th>
                              <th className="w-12"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {filteredProducts.map((product) => (
                              <tr key={product.id} className="hover:bg-secondary/50">
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      className="w-10 h-10 rounded-lg object-cover bg-muted"
                                    />
                                    <span className="font-medium text-foreground">{product.name}</span>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-muted-foreground">{product.inventory}</td>
                                <td className="py-4 px-6">
                                  <Input
                                    type="number"
                                    value={product.inventoryLimit}
                                    onChange={(e) =>
                                      updateInventoryLimit(product.id, Number.parseInt(e.target.value) || 0)
                                    }
                                    className="w-20 border-border focus:border-ring focus:ring-ring"
                                  />
                                </td>
                                <td className="py-4 px-6 text-muted-foreground">{product.price}</td>
                                <td className="py-4 px-6">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeProduct(product.id)}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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
            <div className="lg:sticky lg:top-6 lg:self-start lg:col-span-1">
              <Card className="bg-card border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Preview
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product Preview */}
                  <div className="space-y-4">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <div className="w-24 h-24 bg-card rounded-lg shadow-sm flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">Product Image</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-foreground">White T-shirt</h3>
                      <p className="text-lg font-semibold text-foreground">₫499.00</p>
                    </div>

                    {/* Size Selector */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Size</Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger className="border-border focus:border-ring focus:ring-ring">
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
                      <Button className="w-full polaris-button-primary py-3 text-base" size="lg">
                        {buttonText}
                      </Button>
                      <p className="text-sm text-muted-foreground text-center">{message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Add Products Modal - Polaris Style */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md bg-white border-0 shadow-lg rounded-lg p-0">
          <div className="border-b border-gray-200 px-6 py-4">
            <DialogTitle className="text-lg font-medium text-gray-900">Add products</DialogTitle>
          </div>
          <div className="px-6 py-6">
            <RadioGroup value={addProductType} onValueChange={setAddProductType} className="space-y-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="specific" id="specific" className="mt-0.5" />
                <div className="space-y-1">
                  <Label htmlFor="specific" className="text-sm font-medium text-gray-900 cursor-pointer">
                    Specific products
                  </Label>
                  <p className="text-sm text-gray-600">Add individual products to this campaign</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="collections" id="collections" className="mt-0.5" />
                <div className="space-y-1">
                  <Label htmlFor="collections" className="text-sm font-medium text-gray-900 cursor-pointer">
                    Collections
                  </Label>
                  <p className="text-sm text-gray-600">Add all products from selected collections</p>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showProductSelectionModal} onOpenChange={setShowProductSelectionModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] bg-white border-0 shadow-xl rounded-lg p-0 m-0">
          {/* Polaris Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelProductSelection}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-lg font-medium text-gray-900">{getModalTitle()}</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelProductSelection}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col h-[calc(90vh-120px)]">
            {/* Polaris Search and Filters Section */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products"
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Search by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                    <SelectItem value="all" className="px-3 py-2 hover:bg-gray-50">
                      All
                    </SelectItem>
                    <SelectItem value="product_title" className="px-3 py-2 hover:bg-gray-50">
                      Product title
                    </SelectItem>
                    <SelectItem value="product_id" className="px-3 py-2 hover:bg-gray-50">
                      Product ID
                    </SelectItem>
                    <SelectItem value="barcode" className="px-3 py-2 hover:bg-gray-50">
                      Barcode
                    </SelectItem>
                    <SelectItem value="sku" className="px-3 py-2 hover:bg-gray-50">
                      SKU
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Polaris Table */}
            <div className="flex-1 overflow-auto bg-white">
              {/* Table Header */}
              <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-6 py-3">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Products</span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Available</span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</span>
                  </div>
                </div>
              </div>

              {/* Product Rows */}
              <div className="divide-y divide-gray-200">
                {filteredAllProducts.map((product) => (
                  <div key={product.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center gap-4">
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) => handleProductSelect(product.id, checked as boolean)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        </div>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-sm text-gray-600">{product.inventory}</span>
                      </div>
                      <div className="col-span-3 text-right">
                        <span className="text-sm font-medium text-gray-900">{product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Polaris Footer */}
            <div className="border-t border-gray-200 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedProducts.length} of {filteredAllProducts.length} products selected
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCancelProductSelection}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddSelectedProducts}
                    disabled={selectedProducts.length === 0}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
