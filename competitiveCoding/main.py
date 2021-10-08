
months = []

months.append(('january', 31))
months.append(('february', 29))
months.append(('march', 31))
months.append(('april', 30))
months.append(('may', 31))
months.append(('june', 30))
months.append(('july', 31))
months.append(('august', 31))
months.append(('september', 30))
months.append(('october', 31))
months.append(('november', 30))
months.append(('december', 31))


# calculate 183 days from current date
def getDate():
  day = int(input())
  month = input()

  days_remaining = 183;
  counter = 0;
  for i in months:
    counter = counter + 1
    if i[0] == month:
      days_remaining -= i[1] - day
      break

  # print(months[counter-1][0]+": "+str(months[counter-1][1]- day));

  output_day = 0;
  while True:
    if(days_remaining - months[counter][1] <= 0):
      output_day = days_remaining;
      break
    # print(months[counter][0]+": "+str(months[counter][1]));
    days_remaining-=months[counter][1];
    counter += 1
    if(counter >= 12):
      counter = 0

  print(output_day," ",months[counter][0])
    

getDate();

      

