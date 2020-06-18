Feature: Products Purchases - Global Store
  As a customer based on different countries
  I want to be able to purchase different products using different payment methods, so that they will be delivered to me

#  Integrations:  Validates ESI-Server integration (product page), eCapture integration (card authorisation), ORR (order details display), email (order confirmation)

  @ProductPurchaseE2E @logOut @email
  Scenario: Successful purchase of all non-SDRM product types in a single cart using existing customer checkout
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
      | 1        | VST ebook                            |
      | 1        | VST bundle                           |
      | 1        | Delta personal journal               |
      | 1        | Delta institutional journal          |
      | 1        | ARGI personal journal (1 year)       |
      | 1        | ARGI institutional journal (3 years) |
      | 1        | ArticleChoice (20 articles)          |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a mastercard
    Then  eCapture is successful
    And   The order is displayed in Elsevier Order History
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 2 VST download links
    And   All of the VST download links should redirect to VST

  @ProductPurchaseE2E @logOut @email
  Scenario: Successful purchase of all non-SDRM product types in a single cart using guest checkout
    Given I am based in US
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
      | 1        | VST ebook                            |
      | 1        | VST bundle                           |
      | 1        | Delta personal journal               |
      | 1        | Delta institutional journal          |
      | 1        | ARGI personal journal (1 year)       |
      | 1        | ARGI institutional journal (3 years) |
    And   I proceed to the checkout page
    And   I enter my shipping and billing address details
    And   I continue to pay using a visa
    Then  eCapture is successful
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 2 VST download links
    And   All of the VST download links should redirect to VST

  @DailyE2E @logOut @email
  Scenario Outline: Successful purchase of all non-SDRM product types in a single cart using guest checkout from customers based in different countries using different currencies
    Given I am based in <Country>
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type            |
      | 1        | <Print Book>            |
      | 1        | <eBook>                 |
      | 1        | <Bundle>                |
      | 1        | <Personal Journal>      |
      | 1        | <Institutional Journal> |
    And   I proceed to the checkout page
    And   I enter my shipping and billing address details
    And   I continue to pay using a mastercard
    Then  eCapture is successful
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 2 VST download links
    And   All of the VST download links should redirect to VST
    Examples:
      | Country | Print Book | eBook                 | Bundle     | Personal Journal                 | Institutional Journal                 |
      | GB      | Print book | eBook - GBP, EUR, AUD | VST bundle | Personal journal - GBP, EUR, JPY | Institutional journal - GBP, EUR, JPY |
      | DE      | Print book | eBook - GBP, EUR, AUD | VST bundle | Personal journal - GBP, EUR, JPY | Institutional journal - GBP, EUR, JPY |
      | AU      | Print book | eBook - GBP, EUR, AUD | VST bundle | N/A                              | N/A                                   |

  @DailyE2E @logOut @email
  Scenario Outline: Successful purchase of all non-SDRM product types in a single cart using guest checkout from customers based in different countries using different currencies
    Given I am based in <Country>
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type            |
      | 1        | <Print Book>            |
      | 1        | <eBook>                 |
      | 1        | <Bundle>                |
      | 1        | <Personal Journal>      |
      | 1        | <Institutional Journal> |
    And   I proceed to the checkout page
    And   I enter my shipping and billing address details
    And   I continue to pay using a visa
    Then  eCapture is successful
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    Examples:
      | Country | Print Book | eBook | Bundle | Personal Journal                 | Institutional Journal                 |
      | JP      | N/A        | N/A   | N/A    | Personal journal - GBP, EUR, JPY | Institutional journal - GBP, EUR, JPY |

  @DailyE2E @logOut @email
  Scenario Outline: Successful purchase of products using different credit card types
    Given I am based in US
    And   I am on the Elsevier home page
    When  The following product types exist in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
      | 1        | VST ebook                            |
      | 1        | ARGI institutional journal (3 years) |
    And   I proceed to the checkout page
    And   I enter my shipping and billing address details
    And   I continue to pay using a <credit card>
    Then  eCapture is successful
    When  I login into ORR
    Then  The order is displayed in ORR
    Examples:
      | credit card |
      | visa        |
      | mastercard  |
      | amex        |

  @DailyE2E @logOut @email
  Scenario: Successful purchase of pre-order products
    Given I am based in US
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book - (preorder)                           |
    And   I proceed to the checkout page
    And   I enter my shipping and billing address details
    And   I continue to pay using a mastercard
    Then  eCapture is successful
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details

  @ProductPurchaseE2Emob @logOut @email
  Scenario: Successful purchase of all non-SDRM product types in a single cart using existing customer checkout
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
      | 1        | VST ebook                            |
      | 1        | VST bundle                           |
      | 1        | Delta personal journal               |
      | 1        | Delta institutional journal          |
      | 1        | ARGI personal journal (1 year)       |
      | 1        | ARGI institutional journal (3 years) |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a mastercard
    Then  eCapture is successful
    And   The order is displayed in Elsevier Order History
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 2 VST download links
    And   All of the VST download links should redirect to VST

  @ProductPurchaseE2Esdrm @logOut @email
  Scenario: Successful purchase of all SDRM product types in a single cart using existing customer checkout
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    When  I add the following product types in the cart:
      | Quantity | Product Type |
      | 1        | SDRM ebook   |
      | 1        | SDRM bundle  |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I continue to pay using a mastercard
    Then  eCapture is successful
    And   The order is displayed in Elsevier Order History
    When  I login into ORR
    Then  The order is displayed in ORR
    And   I receive an order confirmation email
    And   The order confirmation email contains the correct order and customer details
    And   I receive an eBook access links email
    And   The eBook access links email should contain 2 EPub download links
    And   The eBook access links email should contain 2 Mobi download links
    And   The eBook access links email should contain 2 PDF download links

# -------------------------Production E2E Tests---------------------------

  @PROD @ProductPurchasePROD @logout
  Scenario: A single print book can be purchased using the existing account checkout path
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
  # And   My cart is empty - TODO: Need to fix this step as it's not working as expected atm
    When  I add the following product types in the cart:
      | Quantity | Product Type |
      | 1        | Print book   |
    And   I proceed to the checkout page
    And   I login on the checkout page
    Then  eCapture is accessible

  @PROD @ProductPurchasePROD @logout
  Scenario: A single print book can be purchased using the guest checkout path
    Given I am based in US
    And   I am on the Elsevier home page
  # And I am not logged in on the Elsevier home page
  # And My cart is empty - TODO: Need to fix this step as it's not working as expected atm
    When  I add the following product types in the cart:
      | Quantity | Product Type |
      | 1        | Print book   |
    And   I proceed to the checkout page
    And   I enter my shipping and billing address details
    Then  eCapture is accessible

# --------------------------ScienceDirect E2E Tests---------------------------

  @SDCheckoutE2E @SDCheckoutE2Emob @logOut
  Scenario: Successful purchase of a ScienceDirect article in a single cart using guest checkout
    Given I am an existing customer based in US
    And   I am not logged in to ScienceDirect
    When  The following product types exist in the cart:
      | Quantity | Product Type |
      | 1        | SD Article   |
    And   I login on the SD authorisation page
    And   I proceed to the SD checkout page
    And   I enter my shipping and billing address details on the SD checkout page
    And   I continue to pay in SD
    Then  eCapture is successful in SD
    And   The order is displayed correctly in Order History
    When  I login into ORR
    Then  The order is displayed in ORR
  # And   I receive an order confirmation email
  # And   The confirmation email contains the correct order and customer details
