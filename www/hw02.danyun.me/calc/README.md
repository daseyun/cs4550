# Design specifications:

## order of operations

Since assignment requires to use a single button for "+" and "=" functionality, the calculator will treat it such that all expressions are within parenthesis.
An inputted expression like so:

> 3 + 3 x 2 (hit equals to end)

will be treated like such:

> (3+3) x 2

Since "+/=" key requires immediate calculation of additions and the fact the calculator has no parenthesis keys, all expressions will be calculated instantly as if they were within parenthesis to avoid confusion. (Subtraction working differently than additions).

---

## number limits/overflow

Number of digits is capped at 21. Numbers exceeding this are represented via scientific notation.
This includes '.' or '-'.

## number display

A newly calculated number will only be displayed/updated if the "+/=" button is pressed.
Mimicking the inputs below:

> 3 x 3 - 2  
> Displayed: 2

> 3 +/= 3 x 6 +/=
> Displayed: 36

## clear functionality

Clearing will reset the entire calculator.
Otherwise, if you wanted to do two different calculations:

> 3 + 3

and

> 19 x 3

the input would look something like this:

> 3 +/= 3 +/= 19 x 3 +/=

Clear resets everything, so that there are no unwanted chain of calculations.
