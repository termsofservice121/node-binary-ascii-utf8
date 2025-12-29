const fs = require('fs');
const path = require('path');

// Lorem Ipsum text
const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

// Create temporary directory if it doesn't exist
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// File paths
const binaryFile = path.join(tempDir, 'lorem_binary.bin');
const asciiFile = path.join(tempDir, 'lorem_ascii.txt');
const utf8File = path.join(tempDir, 'lorem_utf8.txt');

console.log('=== File Size Comparison for Different Encodings ===\n');
console.log('Content:', loremIpsum.substring(0, 100) + '...\n');

// 1. Binary encoding (latin1)
// Each character is stored as a single byte
fs.writeFileSync(binaryFile, loremIpsum, 'binary');
const binarySize = fs.statSync(binaryFile).size;
console.log('1. BINARY (latin1) encoding:');
console.log(`   File: ${binaryFile}`);
console.log(`   Size: ${binarySize} bytes`);
console.log(`   Note: Each character stored as single byte (0-255)\n`);

// 2. ASCII encoding
// ASCII is a subset of UTF-8 for characters 0-127
fs.writeFileSync(asciiFile, loremIpsum, 'ascii');
const asciiSize = fs.statSync(asciiFile).size;
console.log('2. ASCII encoding:');
console.log(`   File: ${asciiFile}`);
console.log(`   Size: ${asciiSize} bytes`);
console.log(`   Note: Characters > 127 are stripped/replaced\n`);

// 3. UTF-8 encoding
fs.writeFileSync(utf8File, loremIpsum, 'utf8');
const utf8Size = fs.statSync(utf8File).size;
console.log('3. UTF-8 encoding:');
console.log(`   File: ${utf8File}`);
console.log(`   Size: ${utf8Size} bytes`);
console.log(`   Note: Variable-length encoding (1-4 bytes per character)\n`);

// Comparison
console.log('=== Size Comparison ===');
console.log(`Binary:  ${binarySize} bytes`);
console.log(`ASCII:   ${asciiSize} bytes`);
console.log(`UTF-8:   ${utf8Size} bytes`);

// Additional info
console.log('\n=== Buffer Sizes (in-memory) ===');
const bufferBinary = Buffer.from(loremIpsum, 'binary');
const bufferAscii = Buffer.from(loremIpsum, 'ascii');
const bufferUtf8 = Buffer.from(loremIpsum, 'utf8');

console.log(`Binary buffer:  ${bufferBinary.length} bytes`);
console.log(`ASCII buffer:   ${bufferAscii.length} bytes`);
console.log(`UTF-8 buffer:   ${bufferUtf8.length} bytes`);

console.log('\n=== Character Analysis ===');
console.log(`String length: ${loremIpsum.length} characters`);
console.log(`Unique characters: ${new Set(loremIpsum).size}`);

// Check for non-ASCII characters
const nonAscii = loremIpsum.split('').filter(char => char.charCodeAt(0) > 127);
if (nonAscii.length > 0) {
  console.log(`Non-ASCII characters found: ${nonAscii.join(', ')}`);
} else {
  console.log('All characters are ASCII (0-127)');
}

console.log('\n✓ Files created successfully in ./temp directory');

// Cleanup function (optional)
process.on('exit', () => {
  console.log('\nCleaning up temporary files...');
  try {
    fs.unlinkSync(binaryFile);
    fs.unlinkSync(asciiFile);
    fs.unlinkSync(utf8File);
    fs.rmdirSync(tempDir);
    console.log('Cleanup complete!');
  } catch (err) {
    // Ignore cleanup errors
  }
});