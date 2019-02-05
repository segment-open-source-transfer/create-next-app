#! /usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const lib = require('.')
const pkg = require('./package.json')

const messages = lib.messages
const createNextApp = lib.createNextApp

let projectName

const validateArgs = args => {
  let hasSwitch = args.find(arg => arg.includes('-'))
  if (hasSwitch) {
    let index = args.indexOf(hasSwitch)
    args.splice(index, 2)
  }
  return args
}
program
  .version(pkg.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(function(name) {
    projectName = name
    if (validateArgs(process.argv.slice(2)).length > 1) {
      messages.hasMultipleProjectNameArgs()
      process.exit(1)
    }
  })
  .option('-e, --example <example-path>', messages.exampleHelp())
  .allowUnknownOption()
  .on('--help', messages.help)
  .parse(process.argv)

const example = program.example

createNextApp({
  projectName,
  example
})
