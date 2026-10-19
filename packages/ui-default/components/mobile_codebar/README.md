# Mobile Code Optimization for Hydro OJ

This component introduces a dedicated **Mobile Coding Experience** for smartphones and tablets:

## Key Features
1. **Mobile Accessory CodeBar (`MobileCodeBar`)**:
   - Fixed sticky toolbar resting right above the software keyboard on screens `<= 768px`.
   - 1-touch programming keys: `Tab`, `{ }`, `( )`, `[ ]`, `" "`, `;`, `=`, `<`, `>`, `<=`, `>=`, `==`, `!=`, `cin >>`, `cout <<`, `Console.`.
   - Auto cursor placement inside paired brackets.
   - Quick **🚀 Nộp Bài (Submit)** button directly inside the thumb-accessible dock.
2. **Auto-correct & Capitalization Disabling**:
   - Injects `autocapitalize="none"`, `autocorrect="off"`, `spellcheck="false"` into the code editor textarea to prevent mobile OS interference with code syntax.
3. **Responsive Typography & Touch Targets**:
   - Optimized font sizes (14px monospace) and minimum 38px touch targets for thumb navigation.
