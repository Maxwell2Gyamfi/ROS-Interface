

class User():
    def __init__(self, firstName, surname, email, password):
        self.firstName = firstName
        self.surname = surname
        self.email = email
        self.password = password

    def getFirstName(self):
        return self.firstName

    def getSurname(self):
        return self.surname

    def getEmail(self):
        return self.email

    def getPassword(self):
        return self.password

    def setPassword(self, hash_password):
        self.password = hash_password