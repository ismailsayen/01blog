package com.blog.utils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class DateNowFormatted {
    public static LocalDateTime nowDateTime() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime truncatedNow = now.truncatedTo(ChronoUnit.SECONDS);
        return truncatedNow;
    }
}
