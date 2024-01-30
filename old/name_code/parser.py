import re

output = open("name_code/output_lang_code.json", 'w') 

input = open("name_code/langcode.txt")


output.write("{")
for ligne in input : 
    try :
        l = ligne[:-2].split(',')
        code = re.sub(r'[^\w\-]', '', l[1].split('>')[1])
        print(code)
        pays =  re.sub(r'[^\w\-]', '', l[0].split('>')[1])
        
        output.write(f"\"{code}\" : \"{pays}\",\n")
        
    #   for i in range (0, len(l)-2) :
    #      pays += l[i] + " "
        #output.write("\""+l[-2]+ "\" : \""+pays+"\",\n")
    except : 
        pass

output.write("}")

    