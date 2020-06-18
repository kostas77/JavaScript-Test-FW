Feature: Products Purchases Promotions
  As a customer from various countries
  I want to be able to purchase different products using different payment methods, so that they will be delivered to me

#  Integrations:  Validates ESI-Server integration (product page), Magento integration (account), eCapture integration (card authorisation), ORR (order details display), email (order confirmation)

  @ProductPurchaseE2E @logOut @email
  Scenario: Successful purchase of some product types in a single cart using a promo code for percentile cart discount and existing customer checkout
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
      | 1        | VST ebook                            |
      | 1        | Delta personal journal               |
      | 1        | ARGI institutional journal (3 years) |
      | 1        | ArticleChoice (20 articles)          |
    And   I apply a percentage discount promo code to the cart
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a amex
    Then  eCapture is successful
    And   The order is displayed in Elsevier Order History
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 1 VST download links
    And   All of the VST download links should redirect to VST

  @ProductPurchaseE2E @logOut @email
  Scenario: Successful purchase of products using a promo code for bogo cart promotion and existing customer checkout
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type |
      | 3        | Print book   |
      | 1        | VST ebook    |
    And   I apply a bogo discount promo code to the cart
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a mastercard
    Then  eCapture is successful
    And   The order is displayed in Elsevier Order History
  # And I login into ORR
  # And The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 1 VST download links
    And   All of the VST download links should redirect to VST
