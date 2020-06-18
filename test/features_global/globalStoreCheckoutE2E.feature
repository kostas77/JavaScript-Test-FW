Feature: Products Purchases - Global Store
  As a customer based on different countries
  I want to be able to purchase different products using different payment methods, so that they will be delivered to me
  and if I log in I want my details to be prefilled

#  Integrations:  Validates ESI-Server integration (product page), eCapture integration (card authorisation), ORR (order details display), email (order confirmation)

  @GSCheckoutE2E @logOut @email
  Scenario: Successful purchase of all non-SDRM product types in a single cart using existing customer checkout
    Given I am an existing customer based in US
    And   I add the following product types directly to the cart in global store checkout:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
      | 1        | VST ebook                            |
      | 1        | VST bundle                           |
      | 1        | Delta personal journal               |
      | 1        | Delta institutional journal          |
      | 1        | ARGI personal journal (1 year)       |
      | 1        | ARGI institutional journal (3 years) |
    And   I change my delivery country to US
    When  I login into my account
    And   I proceed to the global store checkout page
    And   I accept the terms and conditions
    And   I store the order and cart prices
    And   I click on the checkout button in checkout
    Then  I am taken to the eCapture page
    When  I continue to pay using a visa in global store checkout
    Then  eCapture is successful for global store checkout
    And   The order is displayed in GSC Order History
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 2 VST download links
    And   All of the VST download links should redirect to VST

  @GSCheckoutE2E @email
  Scenario: Successful purchase of all non-SDRM product types in a single cart using guest checkout
    Given I am based in US
    And   I add the following product types directly to the cart in global store checkout:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
      | 1        | VST ebook                            |
      | 1        | VST bundle                           |
      | 1        | Delta personal journal               |
      | 1        | Delta institutional journal          |
      | 1        | ARGI personal journal (1 year)       |
      | 1        | ARGI institutional journal (3 years) |
    And   I change my delivery country to US
    When  I proceed to the global store checkout page
    And   I enter my shipping address details in global store checkout
    And   I have different shipping and billing addresses
    And   I enter my billing address details in global store checkout
    And   I accept the terms and conditions
    And   I store the order and cart prices
    And   I click on the checkout button in checkout
    Then  I am taken to the eCapture page
    When  I continue to pay using a visa in global store checkout
    Then  eCapture is successful for global store checkout
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 2 VST download links
    And   All of the VST download links should redirect to VST

  @GSCheckoutE2Esdrm @logOut @email
  Scenario: Successful purchase of all SDRM product types in a single cart using existing customer checkout
    Given I am an existing customer based in US
    And   I add the following product types directly to the cart in global store checkout:
      | Quantity | Product Type |
      | 1        | SDRM ebook   |
      | 1        | SDRM bundle  |
    And   I change my delivery country to US
    When  I login into my account
    And   I proceed to the global store checkout page
    And   I accept the terms and conditions
    And   I store the order and cart prices
    And   I click on the checkout button in checkout
    Then  I am taken to the eCapture page
    When  I continue to pay using a visa in global store checkout
    Then  eCapture is successful for global store checkout
    And   The order is displayed in GSC Order History
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 2 EPub download links
    And   The eBook access links email should contain 2 Mobi download links
    And   The eBook access links email should contain 2 PDF download links

  @GSCheckoutE2E @logOut
  Scenario: My details are prefilled with my registered account details on the checkout page
    Given I am an existing customer based in US
    And   I add the following product types directly to the cart in global store checkout:
      | Quantity | Product Type |
      | 1        | Print book   |
    When  I login into my account
    And   I proceed to the global store checkout page
    Then  My details are already prefilled

#  @GSCheckoutE2E @logOut @email
#  Scenario Outline: Successful purchase of all non-SDRM product types in a single cart using guest checkout from customers based in different countries using different currencies
#    Given I am based in <Country>
#    And I am on the Elsevier home page
#    When I add the following product types in the cart:
#      | Quantity | Product Type            |
#      | 1        | <Print Book>            |
#      | 1        | <eBook>                 |
#      | 1        | <Bundle>                |
#      | 1        | <Personal Journal>      |
#      | 1        | <Institutional Journal> |
#    And I proceed to the checkout page
#    And I enter my shipping and billing address details
#    And I continue to pay using a mastercard
#    Then eCapture is successful
#    And I login into ORR
#    And The order is displayed in ORR
#    And I receive an order confirmation email
#    And The order confirmation email contains the correct order and customer details
#    And I receive an eBook access links email
#    And The eBook access links email should contain 2 VST download links
#    And All of the VST download links should redirect to VST
#    Examples:
#      | Country | Print Book | eBook                 | Bundle     | Personal Journal                 | Institutional Journal                 |
#      | GB      | Print book | eBook - GBP, EUR, AUD | VST bundle | Personal journal - GBP, EUR, JPY | Institutional journal - GBP, EUR, JPY |
#      | DE      | Print book | eBook - GBP, EUR, AUD | VST bundle | Personal journal - GBP, EUR, JPY | Institutional journal - GBP, EUR, JPY |
#      | AU      | Print book | eBook - GBP, EUR, AUD | VST bundle | N/A                              | N/A                                   |

#   @DailyE2E @logOut @email
#   Scenario Outline: Successful purchase of all non-SDRM product types in a single cart using guest checkout from customers based in different countries using different currencies
#     Given I am based in <Country>
#     And I am on the Elsevier home page
#     When I add the following product types in the cart:
#       | Quantity | Product Type            |
#       | 1        | <Print Book>            |
#       | 1        | <eBook>                 |
#       | 1        | <Bundle>                |
#       | 1        | <Personal Journal>      |
#       | 1        | <Institutional Journal> |
#     And I proceed to the checkout page
#     And I enter my shipping and billing address details
#     And I continue to pay using a visa
#     Then eCapture is successful
#     And I login into ORR
#     And The order is displayed in ORR
#     And I receive an order confirmation email
#     And The order confirmation email contains the correct order and customer details
#     Examples:
#       | Country | Print Book | eBook | Bundle | Personal Journal                 | Institutional Journal                 |
#       | JP      | N/A        | N/A   | N/A    | Personal journal - GBP, EUR, JPY | Institutional journal - GBP, EUR, JPY |

#   @DailyE2E @logOut @email
#   Scenario Outline: Successful purchase of products using different credit card types
#     Given I am based in US
#     And I am on the Elsevier home page
#     When The following product types exist in the cart:
#       | Quantity | Product Type                         |
#       | 1        | Print book                           |
#       | 1        | VST ebook                            |
#       | 1        | ARGI institutional journal (3 years) |
#     And I proceed to the checkout page
#     And I enter my shipping and billing address details
#     And I continue to pay using a <credit card>
#     Then eCapture is successful
#     And I login into ORR
#     And The order is displayed in ORR
#     Examples:
#       | credit card |
#       | visa        |
#       | mastercard  |
#       | amex        |

#   @GlobalStoreCheckoutmob @logOut @email
#   Scenario: Successful purchase of all non-SDRM product types in a single cart using existing customer checkout
#     Given I am an existing customer based in US
#     And I am on the Elsevier home page
#     When I add the following product types in the cart:
#       | Quantity | Product Type                         |
#       | 1        | Print book                           |
#       | 1        | VST ebook                            |
#       | 1        | VST bundle                           |
#       | 1        | Delta personal journal               |
#       | 1        | Delta institutional journal          |
#       | 1        | ARGI personal journal (1 year)       |
#       | 1        | ARGI institutional journal (3 years) |
#     And I proceed to the checkout page
#     And I login on the checkout page
#     And I continue to pay using a mastercard
#     Then eCapture is successful
#     And The order is displayed in Elsevier Order History
#     And I login into ORR
#     And The order is displayed in ORR
#     And I receive an order confirmation email
#     And The order confirmation email contains the correct order and customer details
#     And I receive an eBook access links email
#     And The eBook access links email should contain 2 VST download links
#     And All of the VST download links should redirect to VST

# # -------------------------Production E2E Tests---------------------------

#   @PROD @ProductPurchasePROD @logout
#   Scenario: A single print book can be purchased using the existing account checkout path
#     Given I am an existing customer based in US
#     And I am on the Elsevier home page
# #    And My cart is empty - TODO: Need to fix this step as it's not working as expected atm
#     When I add the following product types in the cart:
#       | Quantity | Product Type |
#       | 1        | Print book   |
#     And I proceed to the checkout page
#     And I login on the checkout page
#     Then eCapture is accessible

#   @PROD @ProductPurchasePROD @logout
#   Scenario: A single print book can be purchased using the guest checkout path
#     Given I am based in US
#     And I am on the Elsevier home page
# #    And I am not logged in on the Elsevier home page
# #    And My cart is empty - TODO: Need to fix this step as it's not working as expected atm
#     When I add the following product types in the cart:
#       | Quantity | Product Type |
#       | 1        | Print book   |
#     And I proceed to the checkout page
#     And I enter my shipping and billing address details
#     Then eCapture is accessible
