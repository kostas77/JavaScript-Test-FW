Feature: Shopping Cart functionality tests
  As an Elsevier customer
  I want to be able to perform different actions on the Cart page and see the expected outcomes

  @wip @CartFunctionalityE2E
  Scenario: Product quantities in the Cart can be increased/decreased successfully
  #  Given My cart is empty - TODO: Need to fix this step as it's not working as expected atm
     When I add a product to the cart
     And  The product appears in the cart
     When I increase the quantity of a product in the cart
     Then The cart price is updated correctly
     When I decrease the quantity of a product in the cart
     Then The cart price is updated correctly

  @wip @CartFunctionalityE2E
  Scenario: Products can be removed from the Cart successfully
  #  Given My cart is empty - TODO: Need to fix this step as it's not working as expected atm
     When I add a product to the cart
     And  I add a product to the cart
     And  The products appear in the cart
     When I remove a product from the cart
     Then The product is successfully removed from the cart
     And  The cart price is updated correctly

  @wip @CartFunctionalityE2E
  Scenario: No more than one eBook product can be added to the Cart
  #  Given My cart is empty - TODO: Need to fix this step as it's not working as expected atm
     When I have a Subscription product in cart page
     And  I add a Subscription product
     Then An error message is correctly displayed for adding more than one copy

  @wip @CartFunctionalityE2E
  Scenario: No more than one Subscription product can be added to the Cart
  #  Given My cart is empty - TODO: Need to fix this step as it's not working as expected atm
     When I have an Ebook in cart page
     And  I change the quantity of the product for checking error
     Then Error message  is displayed for adding more than one copy

  @CartFunctionalityE2E
  Scenario Outline: Cart discount is applied successfully for different products
  #  Given My cart is empty - TODO: Need to fix this step as it's not working as expected atm
     When I add a <product> to the cart
     And  The <product> appears in the cart
     And  I increase the quantity of <product> in the cart
     When I apply the <promo> cart discount code
     Then The cart price is updated correctly for <product>
     Examples:
        | product    | promo |
        | Print book | E2E   |

  @wip @CartFunctionalityE2E
  Scenario: Catalog discount is applied successfully for different products
  #  Given My cart is empty - TODO: Need to fix this step as it's not working as expected atm
     When I add a catalog discounted <product> to the cart
     And  The catalog discounted <product> appears in the cart
     Then The cart price is updated correctly
     When I increase the quantity of a product in the cart
     Then The cart price is updated correctly

  @wip @CartFunctionalityE2E
  Scenario: Bundle items are updated as expected
  #  Given My cart is empty - TODO: Need to fix this step as it's not working as expected atm
     When I add a discounted bundled <product> to the cart
     And  The bundled <product> appears in the cart
     Then I remove one of the items of the bundle
     And  The correct warning message is displayed
     Then The cart price is updated correctly
     When I increase the quantity of a product in the cart
     Then The cart price is updated correctly

  @wip @CartFunctionalityE2E
  Scenario: Trustwave certificate displays a verified status
  #  Given My cart is empty - TODO: Need to fix this step as it's not working as expected atm
     When I add a <product> to the cart
     And  I proceed to the checkout page
     Then A window with a validated Trustwave certificate pops up
     When I proceed to the checkout page
     And  I click on the Trustwave certificate icon
     Then A window with a validated Trustwave certificate pops up
