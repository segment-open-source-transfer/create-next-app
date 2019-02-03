#! /usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const minimist = require('minimist')
const lib = require('.')
const pkg = require('./package.json')

const messages = lib.messages
const createNextApp = lib.createNextApp

let projectName

program
  .version(pkg.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(function(name) {
    projectName = name
    if (minimist(process.argv.slice(2))._.length > 1) {
      messages.multipleProjectArgs()
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
