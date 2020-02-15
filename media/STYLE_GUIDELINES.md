# Style Guidelines
Heal4Me style guidelines are the perfect marriage between legible usefulness and flexibility. We ask contributors to follow the style guidelines below.

### Brackets
Heal4Me uses Stroustrup style, a variant of K&R, in which K&R extends to functions and classes, not just the blocks inside the function. All these brackets have their opening braces on the same line as their respective control statements; closing braces remain in a line of their own, unless followed by a keyword, such as else or while.
```
function party_at_hq(num_heal4me_users) {
   if (num_heal4me_users >= 1000000) {
      console.log("Party at Heal4Me HQ!");
   }
}
```

### Tabs/Spacing
Heal4Me uses tabs to organize and format all code. Our definition of a tab consists of 4 spaces.

### Git Commit Messages
**All commit messages through Git must follow the following format:** <br>
Type of Commit | Files Related to Commit | Further Description <br>
##### Type of Commit
Are you adding a file, removing a file, refactoring a file, better documenting a file, etc?
##### Files Related to Commit
The files being commited. If everything below a directory was modified/created/removed, feel free to simply give the directory. The files must be listed in [Oxford Comma Format](https://www.grammarly.com/blog/what-is-the-oxford-comma-and-why-do-people-care-so-much-about-it/).
##### Further Description
Finally, describe in more detail what has been done to the file(s) in question. <br> <br>
**Together, these commit guidelines look like the following**
```
git commit -m "add | a/new_file.c, a/new_file2.c, a/b/new_file3.c | Three new files were created for the purpose of..."
```

### Variable and Function Names
Both variables and function names are lowercase and underscored, using snake case  style guidleines. Snake case is the practice of "writing compound words or phrases in which the elements are separated with one underscore character... and no spaces, with each element's initial letter usually lowercased within the compound and the first letter either upper- or lowercase—as in 'foo_bar' and 'Hello_world'" ([Wikipedia](https://en.wikipedia.org/wiki/Snake_case)). Keep note, however, that as mentioned above, our implementation of snake case variables and functions are strictly all lowercase.

```
int heal4me_var;
simple_heal4me_function()
```

### File Names
Files that must be easy to find when visiting a repository are entirely capitalized, in which multiple words are separated by underscores. These files apply to anything that a new user must immediately see once coming across this repository for the first time, such as the README, LICENSE, CODE_OF_CONDUCT, and of course, this file, STYLE_GUIDELINES. These files must be located in the home (highest) directory or /media of the repository, unless you plan on including additional README files within subdirectories, in order to describe its contents. Another exception with README.md is the naming format, considering the separate words are not underscored.

Any other file follows a lowercase, snake case format. As explained (and also used in practice) in more depth under "Variable and Function Names," each word is separated by an underscore, all consisting of lowercase letters.


```
secret_file.js
heal4me.py
appropriate_file_name.txt
README.md
dir1/dir2/README.txt
STYLE_GUIDELINES.md
```
