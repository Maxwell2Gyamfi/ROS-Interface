

class User():
    def __init__(self, ID, firstName, surname, active, email, password):
        self.ID = ID
        self.firstName = firstName
        self.surname = surname
        self.email = email
        self.password = password
        self.active = active

    def isUserActive(self):
        return self.active

    def getFirstName(self):
        return self.firstName

    def getUserID(self):
        return self.ID

    def getSurname(self):
        return self.surname

    def getEmail(self):
        return self.email

    def getPassword(self):
        return self.password

    def setPassword(self, hash_password):
        self.password = hash_password

    def getUser(self):
        return (self.firstName, self.surname, self.active, self.email, self.password)

    def __str__(self):
        return f'{self.firstName} {self.surname} {self.active} {self.email}  {self.password} {self.ID}'

    def __repr__(self):
        return f'{self.firstName} {self.surname} {self.active} {self.email} {self.password} {self.ID}'
