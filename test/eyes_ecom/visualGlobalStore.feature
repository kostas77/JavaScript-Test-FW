Feature: eCommerce Global Store visual tests
  Description - TODO

  @visual_eyes @visual_gs @product_pages
  Scenario: Different product pages in the Global Store are displayed as expected
    When I navigate to the following GS product pages:
      | Product Page       |
      | GS - Book          |
      | GS - Journal ARGI  |
#      | GS - Journal Delta |
#      | GS - Book Series   |
    Then The pages are displayed as expected

  @visual_eyes @visual_gs @checkout_flow
  Scenario: The checkout flow pages in the Global Store are displayed as expected
    Given I am an existing customer based in US
    When  The following product types exist in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
      | 1        | VST bundle                           |
      | 1        | Delta personal journal               |
      | 1        | ArticleChoice (20 articles)          |
    And   I proceed to the Global Store checkout page
    Then  The pages are displayed as expected

  @visual_eyes @visual_gs @account_pages
  Scenario: The different sections of the account page in the Global Store are displayed as expected
    Given I am an existing customer based in US
    And   I am logged in
    When  I navigate to the following GS account pages:
      | Account Page              |
      | GS - Address Book         |
      | GS - Change Password      |
      | GS - Online Subscriptions |
      | GS - Order History        |
      | GS - Personal Details     |
    Then  The pages are displayed as expected

  @wip @visual_eyes @visual_gs @catalog_page
  Scenario: The products search flow pages in the Global Store are displayed as expected
    Given I navigate to the catalog page
    And   I perform a search
    Then  The pages are displayed as expected

  @visual_eyes @visual_ck @home_page
  Scenario: The home page sections in the ClinicalKey Store are displayed as expected
    When  I navigate to the CK home page sections:
      | Home Page sections |
      | CK - Home          |
      | CK - About Us      |
      | CK - Residents     |
    Then  The pages are displayed as expected

  @visual_eyes @visual_ck @account_pages
  Scenario: The different sections of the account page in the ClinicalKey Store are displayed as expected
    Given I am an existing customer based in US
    And   I am logged in
    When  I navigate to the following CK account pages:
      | Account Page              |
      | CK - Address Book         |
      | CK - Change Password      |
      | CK - Online Subscriptions |
      | CK - Order History        |
      | CK - Personal Details     |
    Then  The pages are displayed as expected

  @visual_eyes @visual_ck @product_pages
  Scenario: Different product pages in the ClinicalKey Store are displayed as expected
    When I navigate to the following CK product pages:
      | Product Page            |
      | CK - Pathology Extended |
      | CK - Otolaryngology     |
      | CK - Rheumatology       |
    Then  The pages are displayed as expected

  @wip @visual_eyes @visual_ck @checkout_flow
  Scenario: The checkout flow pages in the ClinicalKey Store are displayed as expected
    Given I am an existing customer based in US
    When  The following product types exist in the cart:
      | Quantity | Product                 |
      | 1        | CK - Pathology Extended |
      | 1        | CK - Otolaryngology     |
      | 1        | CK - Rheumatology       |
    And   I proceed to the ClinicalKey Store checkout page
    Then  The pages are displayed as expected

  @visual_eyes @visual_elcm @home_page
  Scenario: The home page sections in the Elsevier website are displayed as expected
    When  I navigate to the Elsevier home page sections:
      | Home Page sections   |
      | ELCM - Home          |
    Then  The pages are displayed as expected
