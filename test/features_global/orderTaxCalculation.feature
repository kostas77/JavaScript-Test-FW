Feature: Order Tax Display
  As a customer
  I want to be shown the correct tax amount on the cart page
  So that I know how much tax I will be charged

#  Integrations: Validates calls to eTax

  @wip @DailyE2E @TaxDisplayE2E @TaxDisplayE2Emob @logOut @resetAddresses
  Scenario: Existing US customer with a single pre-defined address changes address details on the checkout page and tax is updated accordingly
    Given I am an existing customer based in US
    And   I have a single New York address defined for my account
  # And   My cart is empty - TODO: Need to fix this step as it's not working as expected atm
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
    Then  The checkout page shows a tax value of "3.72"
    When  I change my address details to the following in turn:
      | City         | State         | Postcode |
      | Philadelphia | Pennsylvania  | 19103    |
      | Concord      | New Hampshire | 94518    |
    Then  The Checkout page shows the following updated tax values after each address change:
      | City Changed | State Changed | Postcode Changed |
      | 3.36         | 2.52          | 2.52             |
      | 2.52         | 0.00          | 0.00             |

  @wip @DailyE2E @TaxDisplayE2E @TaxDisplayE2Emob @logOut @resetAddresses
  Scenario: Existing AUS customer with a single pre-defined address changes address details on the checkout page and tax is updated accordingly
    Given I am an existing customer based in AU
    And   I have a single Australia address defined for my account
  # And   My cart is empty - TODO: Need to fix this step as it's not working as expected atm
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
    Then  The checkout page shows a tax value of "3.72"
    When  I change my address details to the following in turn:
      | City         | State         | Postcode |
      | Philadelphia | Pennsylvania  | 19103    |
      | Concord      | New Hampshire | 94518    |
    Then  The Checkout page shows the following updated tax values after each address change:
      | City Changed | State Changed | Postcode Changed |
      | 3.36         | 2.52          | 2.52             |
      | 2.52         | 0.00          | 0.00             |

  @wip @DailyE2E @TaxDisplayE2E @TaxDisplayE2Emob @logOut @resetAddresses
  Scenario: Existing GB customer with a single pre-defined address changes address details on the checkout page and tax is updated accordingly
    Given I am an existing customer based in GB
    And   I have a single GB address defined for my account
  # And   My cart is empty - TODO: Need to fix this step as it's not working as expected atm
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
    Then  The checkout page shows a tax value of "3.72"
    When  I change my address details to the following in turn:
      | City         | Region        | Postcode |
      | Philadelphia | Pennsylvania  | 19103    |
    Then  The Checkout page shows the following updated tax values after each address change:
      | City Changed | Region Changed | Postcode Changed |
      | 3.36         | 2.52           | 2.52             |

  @wip @DailyE2E @TaxDisplayE2E @TaxDisplayE2Emob @logOut @resetAddresses
  Scenario: Existing EU customer with a single pre-defined address changes address details on the checkout page and tax is updated accordingly
    Given I am an existing customer based in DE
    And   I have a single DE address defined for my account
  # And   My cart is empty - TODO: Need to fix this step as it's not working as expected atm
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
    Then  The checkout page shows a tax value of "3.72"
    When  I change my address details to the following in turn:
      | Country      | City          | State  | Postcode |
      | Philadelphia | Pennsylvania  | 19103  |          |
      | Concord      | New Hampshire | 94518  |          |
    Then  The Checkout page shows the following updated tax values after each address change:
      | City Changed | City Changed | State Changed | Postcode Changed |
      | 3.36         | 3.36         | 2.52          | 2.52             |
      | 3.36         | 2.52         | 0.00          | 0.00             |

  @logOut @resetAddresses @PROD @TaxDisplayPROD
  Scenario: Customer with a single pre-defined address changes address details on the checkout page
    Given I am an existing customer based in US
    And   I have a single New York address defined for my account
  # And   My cart is empty - TODO: Need to fix this step as it's not working as expected atm
    When  I add the following product types in the cart:
      | Quantity | Product Type                         |
      | 1        | Print book                           |
    And   I go to the checkout page
    Then  The checkout page shows a tax value
    When  I change my address details to a New Hampshire address
    Then  The checkout page shows no tax value
