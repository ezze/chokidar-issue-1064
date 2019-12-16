# chokidar-issue-917

The purpose of this repo is to reproduce [this chokidar issue](https://github.com/paulmillr/chokidar/issues/917) when watched directory is a symbolic link. It creates a directory named `dir` and symbolic link `dir-linked` to this directory. This linked directory is being watched by `chokidar`. After that subdirectory `sub` and file `file` are added to `dir`, removed and added again — `chokidar` doesn't trigger event for `file` on second add.

## How to reproduce

```bash
$ yarn
$ node index.js
```

Actual output:

```
addDir: /home/ezze/Development/chokidar-issue-917/dir-linked
addDir: /home/ezze/Development/chokidar-issue-917/dir-linked/sub
add: /home/ezze/Development/chokidar-issue-917/dir-linked/sub/file
unlink: /home/ezze/Development/chokidar-issue-917/dir-linked/sub/file
unlinkDir: /home/ezze/Development/chokidar-issue-917/dir-linked/sub
addDir: /home/ezze/Development/chokidar-issue-917/dir-linked/sub
```

Expected output (works with `chokidar@2`, just install it with `yarn add chokidar@2`):

```
addDir: /home/ezze/Development/chokidar-issue-917/dir-linked
addDir: /home/ezze/Development/chokidar-issue-917/dir-linked/sub
add: /home/ezze/Development/chokidar-issue-917/dir-linked/sub/file
unlink: /home/ezze/Development/chokidar-issue-917/dir-linked/sub/file
unlinkDir: /home/ezze/Development/chokidar-issue-917/dir-linked/sub
addDir: /home/ezze/Development/chokidar-issue-917/dir-linked/sub
add: /home/ezze/Development/chokidar-issue-917/dir-linked/sub/file
```
