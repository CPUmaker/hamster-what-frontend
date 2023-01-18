# ECE651_Frontend



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

## Leverage the repo with git

- [ ] Add your ssh-key to your GitLab account and clone the repo:

```script
# It is recommended to clone with ssh.
git clone ist-git@git.uwaterloo.ca:c58li/ece651_frontend.git
cd ece651_frontend
```

- [ ] Create/switch your develop branch:

```script
git checkout -b <new-branch>            # <new-branch> is what your branch will name.
git checkout ＜existing-branch＞        # <existing-branch> is what your branch names.
# If you wanna list all branch, use the following command:
git branch -a
```

- [ ] After modifying the project, add, commit and push the change to the remote repo:

```script
git add .
git commit -m "..."     # "..." is where you need to add comment.
git push
git push origin <branch-name>       # another version
git push -u origin <new-branch>    # push for new branch
```

- If your teammate reviewed your code, merge it into the main branch:

```script
# ensure you have added and commited in your current branch
git checkout main
git merge <branch-name>
```

## Usage

Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support

Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Contributing

State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.

## License

For open source projects, say how it is licensed.
