Feature: New Account Registration
  As an Elsevier/ClinicalKey customer
  I want to be able to register a new account
  So that I can then be able to access services/pages that are only available to registered users

#  Integrations:  Validates ESI-Server integration (product page), Magento integration (account), eCapture integration (card authorisation),
#                 FSS (whitelist, scoring), ORR (order details display), Tibco (order xml), email (order confirmation)

  @logOut
  Scenario: A new Elsevier user can be registered at the Register/Login page
    Given I am on the Elsevier home page
  # The next step of adding a book to the cart is used to avoid the Captcha verification on the registration page
    And   I add a single book series book to my cart
    When  I navigate to the Register/Login page
    And   I create a new Elsevier account
    Then  I receive a confirmation e-mail
    And   I can navigate to My Account page

  @logOut
  Scenario: A new Elsevier user can be registered at the end of the Guest Checkout process
    Given I am on the Elsevier home page
    When  I add a single book series book to my cart
    And   I proceed to checkout
    And   I enter my Shipping/Billing details
    And   I proceed to the checkout page
    Then  eCapture is successful
    When  I set a password, in order to create a new Elsevier account
    Then  I receive a confirmation e-mail
    And   I can navigate to My Account page

  @logOut
  Scenario: A new ClinicalKey user can be registered at the Clinical Key home page
    Given I am on the CK home page
    When  I add a single book series book to my cart
    And   I proceed to the checkout page
    And   I create a new ClinicalKey account
    Then  I receive a confirmation e-mail
    And   I can navigate to My Account page
