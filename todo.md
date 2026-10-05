# Sanskruti AI - Scripture Explainer MVP Todo List

## Overview
Building a Scripture Explainer AI web application that accepts Sanskrit shlokas and provides multi-level explanations with text-to-speech functionality.

## Files to Create/Modify (Max 8 files)

1. **index.html** - Update title and meta tags for Sanskruti AI
2. **src/pages/Index.tsx** - Main application page with:
   - Hero section with cultural theme
   - Sanskrit shloka input area
   - Multi-level explanation display (Basic, Deep, Spiritual)
   - Text-to-speech controls
   - Sample shlokas for quick testing

3. **src/components/ScriptureInput.tsx** - Component for:
   - Textarea for Sanskrit input
   - Sample shloka buttons
   - Submit button

4. **src/components/ExplanationDisplay.tsx** - Component for:
   - Tabbed interface showing 3 explanation levels
   - Beautiful card design with cultural aesthetics

5. **src/components/VoicePlayer.tsx** - Component for:
   - Text-to-speech controls
   - Play/Pause/Stop buttons
   - Voice selection (if available)

6. **src/lib/scriptureData.ts** - Data file containing:
   - Sample shlokas with translations
   - Pre-written explanations at 3 levels
   - Metadata (source, chapter, verse)

7. **src/index.css** - Add custom styles:
   - Cultural color scheme (saffron, green, white)
   - Sanskrit font support
   - Gradient backgrounds

## Implementation Strategy
- Use localStorage for now (no backend needed for MVP)
- Pre-populate with 5-7 famous Bhagavad Gita shlokas
- Use Web Speech API for text-to-speech
- Focus on beautiful UI with Indian cultural aesthetics
- Responsive design for mobile and desktop

## Success Criteria
- User can input or select a Sanskrit shloka
- Display explanations in 3 levels clearly
- Text-to-speech works for explanations
- Beautiful, culturally-themed interface
- Mobile responsive