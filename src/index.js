/**
 * Toolencahnt - Main Entry Point
 * A comprehensive toolkit for enhancing and streamlining your workflow
 */

class Toolencahnt {
  constructor() {
    this.version = '1.0.0';
    this.tools = {};
  }

  /**
   * Register a new tool
   * @param {string} name - Tool name
   * @param {function} fn - Tool function
   */
  registerTool(name, fn) {
    if (typeof fn !== 'function') {
      throw new Error('Tool must be a function');
    }
    this.tools[name] = fn;
    console.log(`✓ Tool registered: ${name}`);
  }

  /**
   * Execute a registered tool
   * @param {string} name - Tool name
   * @param {*} args - Arguments to pass to the tool
   */
  async executeTool(name, args) {
    if (!this.tools[name]) {
      throw new Error(`Tool not found: ${name}`);
    }
    return await this.tools[name](args);
  }

  /**
   * Get list of all registered tools
   */
  listTools() {
    return Object.keys(this.tools);
  }
}

module.exports = Toolencahnt;
