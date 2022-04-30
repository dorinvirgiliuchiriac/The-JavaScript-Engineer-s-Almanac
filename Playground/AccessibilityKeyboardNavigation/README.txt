OVERVIEW & REQUIREMENTS
Navigating websites with a mouse is easy. But not for everyone.
People with disabilities such as visual or motor impairments use the
keyboard to navigate online content. unfortunately, most websites don’t
work well with keyboard navigation.

REQUIREMENTS
1 Create a custom Javascript function that looks through the DOM for
any header <h> tags, link <a> tags and landmarks (e.g., banner,
complementary, contentinfo, form, main, navigation, search, etc., and
landmarks defined within role attributes).
2 Allows users to jump between headers, links and landmarks using
the keyboard alone.
3 Your function should support the following hotkeys:
• “H”: Move focus to next header
• “L”: Move focus to next link
• “M”: Move focus to next landmark
To avoid conflicts, hotkeys should be ignored when focus is on a
form field (e.g, text, search, password, etc.)
4 The direction of the movement should change if the up arrow key
is hit. So if a user hits ↑ and then “HHH”, focus will move three
headers up. If the a then hits ↓ and then “MM”, focus will move two
landmarks down. Direction of movement should work without requiring
simultaneous key presses; meaning, the user should be able to hit one
key at a time (e.g., ↑, L but not ↑+L).

5 Support dynamic content: Your code should properly handle
adding/removing DOM elements and including & excluding them
from the navigation tree.
6 Now make it look good! Please use CSS to ensure the element’s
focus is sufficiently highlighted with a high contrast CSS border
and background color.
7 Ensure cross-browser compatibility across, Edge, Chrome, and FF.
8 Do not use any 3rd party libraries such as jQuery, etc. Use only pure
Javascript that you author specifically for the purpose of this exercise.
9 Your code should be encapsulated in a single Javascript function
that is injectable into any html page. Review your work by injecting it 
in various pages on the internet.