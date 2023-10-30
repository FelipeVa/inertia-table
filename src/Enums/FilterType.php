<?php

namespace FelipeVa\InertiaTable\Enums;

enum FilterType: string
{
    case SELECT = 'select';
    case TEXT = 'text';
    case DATEPICKER = 'datepicker';
    case SEARCH = 'search';
}
