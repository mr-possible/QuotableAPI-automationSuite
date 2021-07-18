Feature: Verify if Page number is correct as per the query parameter in the API GET request.

  @smoke
  Scenario Outline: Verify Page Number
    Given the API request
    When we execute the GET API request based on page number value :: <pagenumber>
    Then the response should contain page number as the sent value.
    Examples:
      | pagenumber |
      | 1          |
      | 2          |