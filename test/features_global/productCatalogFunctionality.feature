Feature: Product Catalog page
  As an Elsevier customer
  I want to be able to search for different types of products using all the filters available
  So that I can find them, view details about them and add them in the cart

  @ProductListingsE2E
  Scenario Outline: When I am searching for products on the catalog page using the available filters I get the expected results
    Given I am on the Catalog home page
    When  I search for <searchQuery> using the following filters: <productType>, <subjectArea>, <relatedSubjectArea>, <secondaryRelatedSubjectArea>, <publicationYears>
    And   I sort the results by <sortOrder> order
    Then  The results for the <searchQuery> search appear as expected
  # Then  the returned search item total includes the search term
    Examples:
      | searchQuery  | productType           | subjectArea          | relatedSubjectArea      | secondaryRelatedSubjectArea | publicationYears | sortOrder                 |
      | MATLAB       | Books                 | Engineering          | Computational Mechanics | Computational Methods       | 2007;2013;2018   | Alphabetic Ascending      |
      | Catalysis    | Journals              | Chemical Engineering | Catalysis               | Biocatalysis                | 2006;1962        | Relevance                 |
      | Encyclopedia | Major Reference Works | Medicine             | Cell Biology            | Cellular Biology            | 2000;2002;2015   | Date Published Descending |

  @ProductListingsE2Emob
  Scenario Outline: When I am searching for products on the catalog page using the available filters I get the expected results
    Given I am on the Catalog home page
    When  I search for <searchQuery> using the following filters: <productType>, <subjectArea>, <relatedSubjectArea>, <secondaryRelatedSubjectArea>, <publicationYears>
    And   I sort the results by <sortOrder> order
    Then  The results for the <searchQuery> search appear as expected
  # Then  the returned search item total includes the search term
    Examples:
      | searchQuery  | productType           | subjectArea          | relatedSubjectArea      | secondaryRelatedSubjectArea | publicationYears | sortOrder                 |
      | Catalysis    | Journals              | Chemical Engineering | Catalysis               | Biocatalysis                | 2006;1962        | Relevance                 |
      | Encyclopedia | Major Reference Works | Medicine             | Cell Biology            | Cellular Biology            | 2000;2002;2015   | Date Published Descending |

  @ProductListingsPROD
  Scenario Outline: When I am searching for products on the catalog page using the available filters I get the expected results
    Given I am on the Catalog home page
    When  I search for <searchQuery> using the following filters: <productType>, <subjectArea>, <relatedSubjectArea>, <secondaryRelatedSubjectArea>, <publicationYears>
    And   I sort the results by <sortOrder> order
    Then  The results for the <searchQuery> search appear as expected
  # Then  the returned search item total includes the search term
    Examples:
      | searchQuery | productType | subjectArea | relatedSubjectArea      | secondaryRelatedSubjectArea | publicationYears | sortOrder            |
      | MATLAB      | Books       | Engineering | Computational Mechanics | Computational Methods       | 2007;2013;2018   | Alphabetic Ascending |
