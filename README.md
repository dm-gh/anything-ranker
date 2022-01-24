# Anything Ranker
### Rank anything!

Live demo:
https://anything-ranker.web.app/

Note to self:

2 interesting mechanics were used

1. async array sorting
2. promises resolved by user interaction

conclusion:

Promises resolved by button click in react were
pretty awkward to implement, because I had to
store resolve function in component state, which
is not a common practice in my experience.
Maybe there is a possibility to abstract it
with a custom hook.
Otherwise it's a good versatile tool.
Array sorting with async interruptions was
passable for this application, but is not
expandable in any shape or form. It is
irrevertable and fragile. Irrevertable means
that I can not implement "undo" button and
fragile means it will lose all the progress
on any error. This is not a sustainable solution.

thoughts on further development:

Solution forr "undo" feature might be to use
different sorting algorithm, one that I can
extract intermediate result, the semisorted array.
Then I would save such array on a stack. The undo
operation will restore last saved array from history
Error handling can be implemented with this
mechanic too
Another feature is to have several items with
same weight on the same place in leaderboard.
This could be done if I imagine ranking as a
competition and not as an array sorting.
All items would start with weight 0 and each
comparison would increase it by 1 for a winner.
I could add an "equal" button that assigns 0.5.
This will resemble the grid system more (S,A,B,C,D,F)
which was the original inspiration for this project
Also I may be able to assign grid tiers automaticly
with some statistics math because it should
produce a normal distribution in a real life case
