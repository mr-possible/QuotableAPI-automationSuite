class Params:
    __QuoteBasedOnPageNumber = 0
    __AuthorName = ''
    __tags = []

    def getQuoteBasedOnPageNumber(self, pageNumber):
        self.__QuoteBasedOnPageNumber = pageNumber
        return self.__QuoteBasedOnPageNumber

    def getAuthorName(self, authorName):
        self.__AuthorName = authorName
        return self.__AuthorName

    def getTags(self, tags):
        self.__tags = tags
        return self.__tags
