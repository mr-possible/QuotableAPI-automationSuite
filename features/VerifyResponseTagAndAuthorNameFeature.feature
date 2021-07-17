Feature: Verify Response after filtering by tag name AND author name

  Scenario Outline: Verify Response after filtering by tag name and author name
    Given the API request
    When We execute API request with <tags> and <authorname>
    Then Check response with <tags> and <authorname>
    Examples:
      | authorname      |  | tags                  |
      | albert-einstein |  | famous-quotes\|wisdom |
      | confucius       |  | famous-quotes,wisdom  |