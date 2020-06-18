Feature: Product Page functionality tests
  As an Elsevier customer I would like to be able to use all the available features on a product page without any issues

  @ProductPageFunctionalityE2E @wip
  Scenario: Google Preview functionality works as expected
    Given I am on the product page of a Print book
    When  I click on the Google Preview button
    Then  The correct Google Preview window pops up

  @ProductPageFunctionalityE2E @wip
  Scenario: When switching country the prices are updated successfully
    Given I am on the product page of a Print book
    When  I change the Country-Region option to Australia
    Then  The prices are displayed in AUD
    When  I change the Country-Region option to United Kingdom
    Then  The prices are displayed in GBP
    When  I change the Country-Region option to United States
    Then  The prices are displayed in USD
    When  I change the Country-Region option to Spain
    Then  The prices are displayed in EUR

  @DailyE2E @ProductPageFunctionalityE2E
  Scenario: Requesting a sales quote for an institutional subscription can be performed successfully
    Given I am on the product page of a Delta institutional journal
    When  I click on the Request a Sales Quote option
    Then  The Request a Sales Quote form appears
  # And   I submit a Sales Quote Request TODO
  # And   My Sales Quote Request is submitted successfully TODO

  @DailyE2E @ProductPageFunctionalityE2E
  Scenario: Clicking on the Tax Exemption link takes me to the correct page
    Given I am on the product page of a Delta institutional journal
    When  I click on the Tax Exempt Orders link
    Then  The correct Tax Exemption info modal pops up

  @ProductPageFunctionalityE2E @wip
  Scenario: Clicking on the Support Centre link takes me to the correct page
    Given I am on the product page of a Print book
    When  I click on the Support Centre link
    Then  The correct e-Commerce Support Centre page opens in a new window-tab

  @ProductPageFunctionalityE2E @wip
  Scenario: Clicking on the View on ScienceDirect link takes me to the correct page
    Given I am on the product page of a Print book
    When  I click on the View on ScienceDirect link
    Then  The correct ScienceDirect page opens in a new window-tab

  @ProductPageFunctionalityE2E @wip
  Scenario: Clicking on the View all volumes in this series link takes me to the correct page
    Given I am on the product page of a book series book
    When  I click on the View all volumes in this series link
    Then  I am taken to the catalog page results with the correct search query

  @ProductPageFunctionalityE2E @wip
  Scenario: Clicking on the View on ScienceDirect link takes me to the correct page
    Given I am on the product page of a Print book SD
    When  I click on the View on ScienceDirect link
    Then  The correct ScienceDirect page opens in a new window/tab

  @ProductPageFunctionalityE2E @wip
  Scenario: Clicking on the eBook format help link
    Given I am on the product page of a Print book
    When  I click on the eBook format help link
    Then  The correct e-Commerce Support Centre page opens in a new window-tab

  @DailyE2E @ProductPageFunctionalityE2E
  Scenario: Product reviews can be submitted successfully
    Given I am based in US
    And   I am on the product page of a Print book
    When  I write a product review
    Then  The review is submitted successfully

  @ProductPageFunctionalityE2E @wip
  Scenario: Social media links take me to the correct page
    Given I am on the product page of a Print book
    When  I click on the Facebook social media link
    Then  The Elsevier Facebook page opens on a new window
    When  I click on the LinkedIn social media link
    Then  The Elsevier LinkedIn page opens on a new window
    When  I click on the Twitter social media link
    Then  The Elsevier Twitter page opens on a new window
    When  I click on the YouTube social media link
    Then  The Elsevier YouTube page opens on a new window
