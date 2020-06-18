Feature: product Purchase
  As a customer
  I want to be able to purchase products
  So that they will be delivered to me

  @full @HealthStores @EUHealthStores @MEAHealthStore @multiProductPurchase @electronicPayment @email @printbook @online
  Scenario: Multiple products can be purchased using the existing account checkout path
    Given I am on the MEA Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Printbook            |
      | Online Resources     |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture MEA
    Then  The order is displayed in the thank you page
    And   I login into ORR
    And   The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @MEAHealthStore @multiProductPurchase @electronicPayment @email @cd @dvd
  Scenario: Multiple products can be purchased using the existing account checkout path
    Given I am on the MEA Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | DVD                  |
      | CD                   |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture MEA
    Then  The order is displayed in the thank you page
    And   I login into ORR
    And   The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @MEAHealthStore @multiProductPurchase @electronicPayment @email @poster @flashcards
  Scenario: Multiple products can be purchased using the existing account checkout path
    Given I am on the MEA Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Poster               |
      | set of flash cards   |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture MEA
    Then  The order is displayed in the thank you page
    And   I login into ORR
    And   The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

@full @HealthStores @EUHealthStores @MEAHealthStore @electronicPayment @journal
  Scenario: Journal can be purchased using the existing account checkout path
    Given I am on the MEA Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Journal              |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture MEA
    Then  The order is displayed in the thank you page
    And   I login into ORR
    And   The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @MEAHealthStore @email @electronicPayment @pin
  Scenario: Purchasing a PIN from the MEA store with eCapture
    Given I am on the MEA Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | PIN                  |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture MEA
    Then  The order is displayed in the thank you page
    And   I login into ORR
    And   The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email

  @full @HealthStores @EUHealthStores @MEAHealthStore @electronicPayment @email @vst
  Scenario: Purchasing an ebook from the MEA store
    Given I am on the MEA Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | VST EBook            |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture MEA
    Then  The order is displayed in the thank you page
    And   I login into ORR
    And   The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email
    And   I receive an vital source email

  @full @HealthStores @EUHealthStores @MEAHealthStore @electronicPayment @email @inkling
  Scenario: Purchasing an ebook from the MEA store
    Given I am on the MEA Store home page
    And   I am an existing customer
    When  I add the following product types in the cart:
      | Product Type         |
      | Inkling EBook            |
    And   I proceed to the checkout page
    And   I login on the checkout page
    And   I place the order with eCapture MEA
    Then  The order is displayed in the thank you page
    And   I login into ORR
    And   The order is displayed in ORR
    And   The order is valid in ORR
    And   ORR has routed or sent the order for fulfillment
    And   I receive an Elsevier new order confirmation email
#    And   I receive an vital source email

