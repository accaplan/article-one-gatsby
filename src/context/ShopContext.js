import React from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "article-one-eyewear.myshopify.com",
  storefrontAccessToken: "14bbddf1ef32edb3316a68cae26a6dd7",
})

const ShopContext = React.createContext()
export default ShopContext

export class ShopProvider extends React.Component {
  constructor(props) {
    super(props)
    const state = {
      shop: {},
      checkout: { lineItems: [] },
      error: null,
    }
    this.state = state
  }

  componentDidMount() {
    let checkoutPromise = client.checkout.create()
    let shopPromise = client.shop.fetchInfo()

    Promise.all([checkoutPromise, shopPromise]).then(response => {
      this.setState({
        checkout: response[0],
        shop: response[1],
      })
    })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  setShopInfo = response => {
    this.setState({
      checkout: response[0],
      shop: response[2],
    })
  }

  setCheckout = checkout => {
    this.setState({ checkout })
  }

  setShop = shopInfo => {
    this.setState({ shop: shopInfo })
  }

  render() {
    const value = {
      // values
      error: this.state.error,
      shop: this.state.shop,
      checkout: this.state.checkout,

      // methods
      setCheckout: this.setCheckout,

      setShop: this.setShop,
      setShopInfo: this.setShopInfo,

      setError: this.setError,
      addVariantToCart: this.addVariantToCart,
      updateQuantityInCart: this.updateQuantityInCart,
      removeLineItemInCart: this.removeLineItemInCart,
    }
    return (
      <ShopContext.Provider value={value}>
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}
