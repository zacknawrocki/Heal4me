# Style Guidelines
Heal4Me style guidelines are the perfect marriage between legible usefulness and flexibility. We ask contributors to follow the style guidelines below.

### Brackets
Heal4Me uses Stroustrup style, a variant of K&R, in which K&R extends to functions and classes, not just the blocks inside the function. All these brackets have their opening braces on the same line as their respective control statements; closing braces remain in a line of their own, unless followed by a keyword, such as else or while.
```
function partyAtHq(num_Heal4Me_users) {
   if (num_Heal4Me_users >= 1000000) {
      console.log("Party at Heal4Me HQ!");
   }
}
```

### Tabs/Spacing
Heal4Me uses tabs to organize and format all code. Our definition of a tab consists of 4 spaces.

### Git Commit Messages
title, listed in oxford format, description of commit


### Variable and Function Names
**Variable Names**
Both variables and function names are lowercase and underscored, using snake case  style guidleines. Snake case is the practice practice of "writing compound words or phrases in which the elements are separated with one underscore character (_) and no spaces, with each element's initial letter usually lowercased within the compound and the first letter either upper- or lowercase—as in 'foo_bar' and 'Hello_world'" ([Wikipedia](https://en.wikipedia.org/wiki/Snake_case)). Keep note, however, that as mentioned above, our implementation of snake case variables and functions will strictly be all lowercase.

```
int heal4me_var;
simple_heal4me_function()
```

### File Names
Files that must be easy to find when visiting a repository must be entirely capitalized, in which multiple words are separated by underscores. These files apply to anything that a new user must immediately see once coming across this repository for the first time, such as the README, LICENSE, CODE_OF_CONDUCT, and of course, this file, STYLE_GUIDELINES. These files must be located in the home (highest) directory of the repository. README.md is an exception, in which separate words should not be underscored.
