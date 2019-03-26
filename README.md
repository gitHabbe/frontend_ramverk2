# React 

## Grunderna 

 

Att komma igång med React är väldigt snabbt och enkelt. Oavsett om du om du ska börja jobba i ett projekt eller ska bygga ett från start så behöver du inte lära dig mycket för att börja skriva kod. Om man vill strippa ner biblioteket till lättast möjliga grad så är det bara ett gäng funktioner som returnerar något som kallas JavaScript XML eller JSX. Med JSX kan du skriva HTML-kod blandat med JavaScript för att konstruera komponenter som i sin tur visas för användaren. Varje komponent är en funktion som utvecklaren definierar och sedan importerar till dom filer som ska använda den.  
Här är ett exempel på hur man kan skapa en komponent som genererar en rubrik tillsammans med en paragraf: 

```JavaScript 

import React from “react”; 
const HeaderAndParagraph = () => { 
    return (<div><h1>Rubrik</h1>p>Paragraf</p>div>); 
}
module.exports = HeaderAndParagraph;
``` 
Likt hur man lägger element inuti element i HTML så kan man placera komponenter i andra komponenter. För att göra det så behöver man bara exportera sin funktion och importera den i den fil som behöver informationen. Att fästa den nya komponenten kan se ut såhär: 
```JavaScript 
<HeaderAndParaGraph /> 
``` 
Precis som vanliga funktioner så kan dessa komponenter tar parametrar för att hantera data som kommer från andra källor. Den stora skillnaden här är att du anger ett namn följt av ett likhetstecken och sedan värdet. Alla parametrar är separerade med mellanslag. För att använda datan så kallar du på objektet ”props”. 

 

Med denna korta introduktion är du redo att bygga simpla applikationer via React, men allt som projektet växer så är det rekommenderat att byta ut funktionerna mot klassbaserade komponenter som kan hantera ”state”. Detta är en populär teknik som kommer med dom största och mest använda ramverken i dagens webbprogrammering. Genom att ändra tillståndet i applikationen via state så får du tillgång det komponentens värden utan att behöva definiera variabler som hämtar data från element i din HTML kod.  

 

## Virtual DOM 

 

Istället för att bygga på den vanliga DOMen (document object model) så virtualiserar React en egen som går att uppdatera på ett snabbare och effektivare sätt. På det här viset så tar det kortare tid för webbläsaren att bryta ner och montera upp hemsidan och dess noder när en förändring sker via till exempel en musklick. React har koll på 2 virtuella DOMs för att kunna avgöra vilka element som ska uppdateras när ett skifte av state har skett. Den nya och gamla DOMen jämförs mot varandra för att avgöra vilka element som tvingas byggas om via dom komponenter som man tidigare skapat. 

Fördelar med att jobba mot virtual DOM är att prestandan ökar eftersom det går snabbare att förändra tillståndet även om man måste bygga upp större delar av applikationen så krävs det mindre resurser av enheten. Det går fortfarande att skriva vanlig JavaScript för att påverka komponenter på sitt eget sätt eftersom React efteråt uppdaterar DOMen. Det finns även nackdelar med att jobba på det här viset. Det tar mer kraft av processorn att virtualisera miljön eftersom det kräver ett extra lager med script för optimeringen.  