def getAuthorName(authorName):
    """
    @return: Returns the json payload required for getting quotes with specific authorName.
    """
    content = {
        'author': authorName
    }
    return content


def getPageNumber(pageNumber):
    """
    @return: Returns the json payload required for getting quotes with specific pageNumber.
    """
    content = {
        'page': pageNumber
    }
    return content


def getTagsAndAuthor(tags, authorName=''):
    """
    @return: Returns the json payload required for getting quotes with specific pageNumber.
    """
    if authorName != '':
        content = {
            'tags': tags,
            'author': authorName
        }
    else:
        content = {
            'tags': tags
        }
    return content
