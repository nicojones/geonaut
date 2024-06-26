def check_valid_birthdate(birthdate: str):
  try:
    birthdate = int(birthdate)
  except:
    print(f"Sorry! {birthdate} is not a valid number!")
    exit(1)

def pluralize_years (year):
  return 'year' if year == 1 else 'years'

def millenial_text (year_of_birth):
  return 'and I am a millenial' if year_of_birth >= 2000 else 'and lucklily i was born before these stupid teenies appeared'

def print_divider():
  print("---------------------------------------\n---------------------------------------\n\n")
