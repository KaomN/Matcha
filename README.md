# Matcha
Hive Helsinki Matcha Project

## Installing npm on School computers

1.
```console
brew install node
```
If you get: Error: The contents of the SDKs in your Command Line Tools (CLT) installation do not match the SDK folder names.

Run command below:
```console
rm -rf $HOME/.brew && git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew && echo 'export PATH=$HOME/.brew/bin:$PATH' >> $HOME/.zshrc && source $HOME/.zshrc && brew update
```
and then try again with:
```console
brew install node
```
3. Wait...
