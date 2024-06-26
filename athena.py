from datetime import datetime, time, timezone
from helpers import check_valid_birthdate, pluralize_years, millenial_text, print_divider

def say_hello():
  print_divider()

  # Numbers
  my_year_of_birth = input('What year were you born?   ->   ')

  check_valid_birthdate()

  my_age = datetime.now().year - my_year_of_birth

  # words
  my_name = input("What's your name?   ->   ")


  welcome_text = f"Hello! My name is {my_name}, and I am {my_age} {pluralize_years()} old, {millenial_text()}"

  print("\n\n ~~~~~~~~~~~~ \n\n")
  print(welcome_text)

  print_divider()
