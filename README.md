### How to use:
Run **npm i**

**Go to src/activeMap.ts**

You should be able to only change the 'src/activeMap.ts' file where you can choose one of the default maps or set your own.\
 \
After your map is ready you can run the app:


**npm run dev**

Open the browser and check the console.

### Notes
I went with a more functional approach, pretty much all the functions are pure.\
\
Just to clarify, I don't have much experience in unit testing yet, I've started to use it very recently. Code coverage is 100%, although I think I might have even tested too many functions. I also exported some functions only for the purpose of testing.\
EDIT: I've removed tests of some functions (related to implementation details) and un-exported them. Code coverage still at 100%.\
\
There are maybe some parts where I could make it more performant (reuse some loops, use regex) but I mainly focused on clean code and readability since that seemed to be emphasised in the task specifications.
