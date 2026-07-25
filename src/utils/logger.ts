/**
 * Centralized logging utility adhering to global Antigravity rules.
 * Log format: [PROCESS/DEF_NAME] function_name: LEVEL - message
 */

type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

export function logMessage(
  processDefName: string,
  functionName: string,
  level: LogLevel,
  message: string,
  error?: unknown
): void {
  const formattedLog = `[${processDefName.toUpperCase()}] ${functionName}: ${level} - ${message}`;

  switch (level) {
    case "INFO":
      console.log(formattedLog);
      break;
    case "WARN":
      console.warn(formattedLog);
      break;
    case "ERROR":
      console.error(formattedLog);
      if (error) {
        console.error(`[${processDefName.toUpperCase()}] ${functionName}: STACKTRACE -`, error);
      }
      break;
    case "DEBUG":
      console.debug(formattedLog);
      break;
  }
}
