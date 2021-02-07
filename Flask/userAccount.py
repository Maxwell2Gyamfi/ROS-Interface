

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

    def getUser(self):
        return (self.firstName, self.surname, self.email, self.password)

    def __str__(self):
        return f'{self.firstName} {self.surname} {self.email} {self.password}'

    def __repr__(self):
        return f'{self.firstName} {self.surname} {self.email} {self.password}'
