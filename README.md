# XSS_PREVENTION_EXAMPLE
This is my submission for the HW4 in CMSI662. It is a mini express server which demonstrates prevention of Cross-Site-Scripting vulnerabilities. 

# Approach
In HTML setting the Doctype helps the webpage render consistently accross browsers. Also setting the default encoding to utf-8 using the charset meta helps us prevent XSS exploits in different encodings. Lastly, setting the right input types to the different input elements would lead a general user to input everything correctly preventing errors in the majority of cases; this includes setting the max date to the current date for the DOB input box. 

In the server, user input is used to make objects which validate the constraints of the inputs. Additionally responses are rendered using React views (Express methodology to templating with React), which prevents code injection by default. 
