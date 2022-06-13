#!/bin/bash
# Ink-Desktop Ink Updater Script
# JaydenDev Software 2022 MIT License
rm -rf Ink
git clone --recursive-submodule https://github.com/Darth-Ness/Ink
git add -A
git commit -m "Update Ink"
git push
